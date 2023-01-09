// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { updateEnv, validateJDCK } from "../../../src/lib/ql";
import prisma from "../../../src/lib/prisma";

const MessageHandler: NextApiHandler = async (req, res) => {
  // 身份判断
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const exists = await prisma.user.findFirst({
    where: { email: session?.user.email as string },
  });
  if (!exists) {
    res.status(401).json({ message: "用户不存在，请重新登录" });
    return;
  }

  // 参数判断 & 更新
  const { data }: { data: { cookie: string; remarks: string } } = req.body;
  const validate = validateJDCK(data.cookie);
  if (validate) {
    const response = await updateEnv(
      "JD_COOKIE",
      data.cookie,
      validate.pt_pin,
      data.remarks
    );
    if (response.code === 200) res.status(200).json({ message: "ok" });
    else res.status(500).json({ message: response.message });
  } else {
    res.status(400).json({ message: "Invalid Cookie" });
  }
};

export default MessageHandler;
