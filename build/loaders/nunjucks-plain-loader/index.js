/**
 * 此 Loader 用于将  nunjucks 渲染出来，以便 Vue 模板使用
 * @param {*} source nunjucks 模板代码
 */
module.exports = function(source) {
  // TODO 暂用不到， mpvue 通过 cansodilate 加载 模板
  return "Hello World Webpack Loader";
};
