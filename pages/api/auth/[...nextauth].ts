import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import crypto from "crypto";
import prisma from "../../../src/lib/prisma";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      authorize: async (credentials) => {
        try {
          const email = credentials?.email || "";
          const password = credentials?.password || "";
          if (!email || !password) return null;

          const user = await prisma.user.findFirst({
            where: {
              email,
            },
          });
          if (!user) return null;

          // sha256 hash password
          // const hash = crypto
          //   .createHash("sha256")
          //   .update(password)
          //   .digest("hex");
          // if (user.password !== hash) return null;
          if (user.password !== password) return null;

          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  theme: {
    colorScheme: "dark",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user && token) {
        session.user.userId = token.userId;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 7 * 24 * 30 * 60, // 7 days
  },
  pages: {
    signIn: "/user/sign-in",
    newUser: "/user/sign-up",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
