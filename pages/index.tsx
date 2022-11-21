import { useState } from "react";
import { Footer } from "../src/components/layout";
import Layout from "../src/components/layout";
import { Tabs, UpdateEnv, ManageEnv } from "../src/components/ql";
import markdownToHtml from "../src/lib/markdownToHtml";
import { getMarkdown } from "../src/lib/api";

export default function Index({
  mdContent,
  url,
}: {
  mdContent: string;
  url: string;
}) {
  const [activeTab, setActiveTab] = useState("Update");
  return (
    <Layout>
      {/* 中间部分 */}
      <div className="card bg-base-300 shadow-xl m-2 overflow-x-auto w-full">
        <div className="card-body">
          <h2 className="card-title">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </h2>
          {activeTab === "Update" ? <UpdateEnv /> : <ManageEnv />}
        </div>
      </div>
      {url && <iframe className="rounded-xl w-full h-[60vh]" src={url} />}
      {/* 渲染 markdown */}
      {mdContent && <Footer content={mdContent} />}
    </Layout>
  );
}

export async function getStaticProps() {
  const mdContent = await markdownToHtml(getMarkdown("notice") || "");
  return {
    props: {
      mdContent,
      url: process.env.IFRAME_URL,
    },
  };
}
