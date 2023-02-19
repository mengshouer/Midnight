// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
import { getServerSession } from "next-auth/next";
import { updateEnv, validateJDCK } from "../../../src/lib/ql";
import prisma from "../../../src/lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import { upsert } from "../../../src/lib/sqlutils";

const MessageHandler: NextApiHandler = async (req, res) => {
  // 身份判断
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res
      .status(401)
      .json({ message: "Unauthorized. You can log in again and try again." });
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
      `pt_key=${validate.pt_key};pt_pin=${validate.pt_pin};`,
      validate.pt_pin,
      data.remarks
    );
    if (response.code === 200) {
      res.status(200).json({ message: "ok" });
      await upsert(session, validate.pt_pin, data.cookie, data.remarks);
    } else res.status(500).json({ message: response.message });
  } else {
    res.status(400).json({ message: "Invalid Cookie" });
  }
};

export default MessageHandler;
