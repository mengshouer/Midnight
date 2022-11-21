// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";
// import crypto from "crypto";
import prisma from "../../../src/lib/prisma";

const MessageHandler: NextApiHandler = async (request, response) => {
  try {
    if (request.method !== "POST") response.status(405).end();
    const { email, password, authcode } = request.body;

    if (!process.env.CLOSE_AUTH_CODE && authcode !== process.env.AUTH_CODE) {
      response.status(401).json({ message: "Invalid auth code" });
    }

    const exists = await prisma.user.findFirst({
      where: { email },
    });

    if (exists) {
      response.status(400).json({ message: "User already exists" });
    } else {
      // sha256 hash password
      // const hash = crypto.createHash("sha256").update(password).digest("hex");

      const user = await prisma.user.create({
        data: {
          name: email,
          email,
          password,
        },
      });
      response.status(200).json(user);
    }
  } catch (err) {
    response.status(500).end();
  }
};

export default MessageHandler;
