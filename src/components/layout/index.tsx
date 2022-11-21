export { default as Footer } from "./Footer";
import Header from "./header";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center w-screen">
      <div className="flex flex-col items-center justify-center w-full md:w-1/2">
        <Header />
        {children}
      </div>
    </div>
  );
}
