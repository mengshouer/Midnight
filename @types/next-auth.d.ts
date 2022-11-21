import "next-auth/jwt";
import type { DefaultSession } from "next-auth";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      username: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    userRole?: "admin";
    userId: string;
    username: string;
  }
}
