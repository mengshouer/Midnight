// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
import { getServerSession } from "next-auth/next";
// import crypto from "crypto";
import prisma from "../../../src/lib/prisma";
import { authOptions } from "../auth/[...nextauth]";
import { type JDInfoProps, filterAllEnv, deleteEnv } from "../../../src/lib/ql";
import { remove } from "../../../src/lib/sqlutils";

const MessageHandler: NextApiHandler = async (request, response) => {
  try {
    const session = await getServerSession(request, response, authOptions);
    const exists = await prisma.user.findFirst({
      where: { email: session?.user.email as string },
    });
    const jd_info: JDInfoProps = exists?.jd_info
      ? JSON.parse(exists.jd_info)
      : {};

    const ql_env = await filterAllEnv("JD_COOKIE");
    for (const env of ql_env) {
      for (const [key, value] of Object.entries(jd_info)) {
        if (env.value === value.cookie) {
          jd_info[key]._id = env._id;
          jd_info[key].enable = env.status !== 1;
        }
      }
    }

    if (request.method === "GET") {
      response.status(200).json(jd_info);
    } else if (request.method === "DELETE") {
      const key = request.body;
      key && session && (await remove(session, key));
      const id = jd_info[key]._id;
      id && (await deleteEnv([id]));
      response.status(200).end();
    } else {
      response.status(405).end();
    }
  } catch (err) {
    response.status(500).end();
  }
};

export default MessageHandler;
