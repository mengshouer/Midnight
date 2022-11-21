import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Status() {
  const { data: session, status } = useSession();

  return (
    <>
      {!session && (
        <>
          <a
            href={`/api/auth/signin`}
            className="btn btn-ghost btn-sm rounded-xl mr-2"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign in
          </a>
        </>
      )}
      {session?.user && (
        <>
          <span className="flex flex-col items-center mx-2">
            <small>Signed in as</small>
            <strong>{session.user.email ?? session.user.name}</strong>
          </span>
          <a
            href={`/api/auth/signout`}
            className="btn btn-ghost btn-sm rounded-xl"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign out
          </a>
        </>
      )}
    </>
  );
}
