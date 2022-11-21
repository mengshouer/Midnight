import fs from "fs";
import { join } from "path";

const mdDirectory = process.cwd();

export function getMarkdown(filename: string) {
  let content;
  try {
    const realFilename = filename.replace(/\.md$/, "");
    const fullPath = join(mdDirectory, `${realFilename}.md`);
    content = fs.readFileSync(fullPath, "utf8");
  } catch (e) {
    content = "";
  }
  return content;
}
