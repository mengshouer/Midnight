import Link from "next/link";
import Router from "next/router";
import { getCsrfToken, signIn } from "next-auth/react";
import type { GetServerSidePropsContext } from "next";
import { useState } from "react";

export default function SignUp({ csrfToken }: { csrfToken: string }) {
  const [message, setMessage] = useState(false);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const response = await signIn("credentials", {
      redirect: false,
      email: body.email,
      password: body.password,
    });
    if (response?.ok) {
      await Router.push("/");
    }
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, 2000);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="container flex justify-center items-center h-screen w-screen"
    >
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <div className="lg:w-2/6 md:w-1/2 bg-gray-400 rounded-lg p-8 flex flex-col w-full">
        {message && (
          <div className="alert alert-warning shadow-lg mb-2 justify-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>登录失败。检查您提供的信息是否正确。</span>
            </div>
          </div>
        )}
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
          Sign In
        </h2>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-700">
            邮箱
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            placeholder="Type email here"
            className="w-full bg-gray-200 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-700">
            密码
          </label>
          <input
            required
            type="password"
            id="password"
            name="password"
            placeholder="Type password here"
            className="w-full bg-gray-200 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          登录
        </button>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-200 mt-3">还没有账号？</p>
          <Link href="/user/sign-up" className="text-indigo-500 text-xs mt-3">
            注册
          </Link>
        </div>
      </div>
    </form>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
