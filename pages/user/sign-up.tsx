import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignUp({
  close_auth_code,
}: {
  close_auth_code: string;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const email: string = e.currentTarget.email.value;
      const password: string = e.currentTarget.password.value;
      const authcode: string = e.currentTarget.authcode.value;
      const data = { email, password, authcode };
      const res = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) setErrorMessage(json.message);
      else {
        setMessage("注册成功，正在跳转...");
        setErrorMessage("");
        setTimeout(() => {
          signIn();
        }, 2000);
      }
    } catch (err) {
      setMessage(err as string);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container flex justify-center items-center h-screen w-screen"
    >
      <div className="lg:w-2/6 md:w-1/2 bg-gray-400 rounded-lg p-8 flex flex-col w-full">
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
          Sign Up
        </h2>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-700">
            邮箱
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Type email here"
            className="w-full bg-gray-200 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-700">
            密码
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Type password here"
            className="w-full bg-gray-200 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <input
            type={close_auth_code ? "hidden" : "text"}
            id="authcode"
            name="authcode"
            placeholder="注册码"
            className="mt-2 w-full bg-gray-200 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          注册
        </button>
        {message && (
          <p className="text-lg text-green-500 text-center">{message}</p>
        )}
        {errorMessage && (
          <p className="text-lg text-red-500 text-center">{errorMessage}</p>
        )}
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-200 mt-3">你已经有账号了吗？</p>
          <div
            onClick={(e) => signIn()}
            className="text-indigo-500 text-xs mt-3"
          >
            登录
          </div>
        </div>
      </div>
    </form>
  );
}

export async function getStaticProps() {
  return {
    props: {
      close_auth_code: process.env.CLOSE_AUTH_CODE,
    },
    revalidate: 3,
  };
}
