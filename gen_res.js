const path = require("path");
const fs = require("fs");
const nunjucks = require("nunjucks");
const prettier = require("prettier");

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

function normalizeVarName(name) {
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
    const name = normalizeVarName(pageName);
    pages.push({
      name,
      url
    });
  }

  // output pages
  genCode(pageListSourceTpl, PAGES_DST_PATH, {
    pages
  });
}

const PAGES_DST_PATH = path.join(__dirname, "src/pages.ts");
const PAGES_DIR = path.join(__dirname, "src/pages");

const pageListSourceTpl = `
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

const IMGS_DST_PATH = path.join(__dirname, "src/images.ts");
const IMGS_DIR = path.join(__dirname, "static/images");

const imgListSourceTpl = `
/**
 *  小程序页 static/images 图片列表，本文件由脚本自动生成，请不要手动修改，谢谢。
 *
 */
const enum Images{
  {% for img in imgs %}
  {{img.name}} = "{{img.path}}",
  {% endfor %}
}

export default Images;
`;

function genImageList() {
  const filenames = fs.readdirSync(IMGS_DIR);
  const imgs = [];
  // 1) list all page names
  for (const imgName of filenames) {
    if (imgName[0] === ".") {
      continue;
    }
    const filepath = path.join(IMGS_DIR, imgName);
    if (fs.statSync(filepath).isFile()) {
      const path = "/static/images/" + imgName;
      const name = normalizeVarName(imgName);
      imgs.push({ name, path });
    }
  }

  // output pages
  genCode(imgListSourceTpl, IMGS_DST_PATH, {
    imgs
  });
}

function genCode(sourceTpl, outputPath, context) {
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
  fs.writeFileSync(outputPath, output, "utf8");
}

function main() {
  genPageList();
  genImageList();
}

main();
