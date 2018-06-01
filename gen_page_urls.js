const path = require("path");
const fs = require("fs");
const nunjucks = require("nunjucks");
const prettier = require("prettier");

const DST_PATH = path.join(__dirname, "src/pages.ts");
const PAGES_DIR = path.join(__dirname, "src/pages");

const sourceTpl = `
/**
 *  小程序页面列表，本文件由脚本自动生成，请不要手动修改，谢谢。
 *
 * 小程序页面 url 枚举列表
 */
const enum PageUrls{
  {% for page in pages %}
  {{page.name}} = "{{page.url}}",
  {% endfor %}
}

export default PageUrls;
`;

function camelizeWord(word) {
  return word[0].toUpperCase() + word.substring(1);
}

function snakelizeName(...parts) {
  if (parts.length === 1) {
    return parts[0];
  }
  for (let i = 1; i < parts.length; i++) {
    parts[i] = camelizeWord(parts[i]);
  }
  return parts.join("");
}

function normalizePageName(name) {
  const parts = name.split(/[^a-zA-Z0-9]/);
  const normalizedParts = parts.map(p => p.trim()).filter(p => p.length > 0);
  return snakelizeName(...normalizedParts);
}

function genPageList() {
  const filenames = fs.readdirSync(PAGES_DIR);
  const pageNames = [];
  // 1) list all page names
  for (const pageName of filenames) {
    console.info(pageName);
    const dirpath = path.join(PAGES_DIR, pageName);
    if (fs.statSync(dirpath).isDirectory()) {
      const mainfilepath = path.join(dirpath, "main.ts");
      if (fs.statSync(mainfilepath).isFile()) {
        pageNames.push(pageName);
      }
    }
  }
  const pages = [];
  for (const pageName of pageNames) {
    const url = `pages/${pageName}/main`;
    const name = normalizePageName(pageName);
    pages.push({
      name,
      url
    });
  }

  // output pages
  genCode({
    pages
  });
}

function genCode(context) {
  const tsSource = nunjucks.renderString(sourceTpl, context);
  const debug = false;
  let output;
  if (debug) {
    output = tsSource;
  } else {
    output = prettier.format(tsSource, {
      parser: "typescript"
    });
  }
  fs.writeFileSync(DST_PATH, output, "utf8");
}

genPageList();
