import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Vue,
  Watch
} from "vue-property-decorator";
import { VueConstructor } from "vue";
import eventBus from "./eventBus";

interface IMpVue extends VueConstructor {
  mpType: string;
}

// 添加小程序hooks http://mpvue.com/mpvue/#_4
Component.registerHooks([
  // app
  "onLaunch", // 初始化
  "onShow", // 当小程序启动，或从后台进入前台显示
  "onHide", // 当小程序从前台进入后台
  // pages
  "onLoad", // 监听页面加载
  "onShow", // 监听页面显示
  "onReady", // 监听页面初次渲染完成
  "onHide", // 监听页面隐藏
  "onUnload", // 监听页面卸载
  "onPullDownRefresh", // 监听用户下拉动作
  "onReachBottom", // 页面上拉触底事件的处理函数
  "onShareAppMessage", // 用户点击右上角分享
  "onPageScroll", // 页面滚动
  "onTabItemTap" //当前是 tab 页时， 点击 tab 时触发 （mpvue 0.0.16 支持）
]);

Vue.config.productionTip = true;

// 在这个地方引入是为了registerHooks先执行
import App from "./App.vue";
import PageUrls from "@/pages";
const app = new Vue(App);
app.$mount();

/**
 * 在 mpvue 实现中
 * 由于下面的导出的对象会被 bablon 直接求值然后转成 json 字符串。
 * 所以不能使用其他的比如 export default config 的方式来导出， 这会报找不到 config 的错误。
 * 但是下面可以使用 PageUrls.teacher 这样的方式来引用。因为这是 ts 文件。
 * 在转成 js 文件时， PageUrls.teacher 已经被替换成为字符串。
 *  export default config;
 *  现在采用的方法是在对角字面量后台加一个类型转换声明，这样也有字段提示及文档提示。
 */
export default {
  config: {
    pages: ["^" + PageUrls.home], // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    window: {
      backgroundTextStyle: "dark",
      navigationBarBackgroundColor: "#504f56",
      navigationBarTitleText: "Meynote",
      navigationBarTextStyle: "white",
      backgroundColor: "#efeff4"
    } as mpc.WindowConfig,
    debug: true
  } as mpc.AppConfig
};
