import { Vue, Component } from "vue-property-decorator";
import * as store from "@/store";
import eventBus from "@/eventBus";
import * as mpex from "@/mpex";
import Log from "@/logbox";
import WeuiTabBar from "@/components/weui/WeuiTabBar.vue";
import Images from "@/images";

// 必须使用装饰器的方式来指定component
@Component({
  components: {
    WeuiTabBar
  }
})
class Index extends Vue implements mp.VueLifecycle, mp.PageLifecycle {
  items = [
    { icon: Images.icWarnOutlinePng, title: "微信", badge: 8 },
    { icon: Images.icWarnOutlinePng, title: "通讯录" },
    { icon: Images.icWarnOutlinePng, title: "发现", badge: -1 },
    { icon: Images.icWarnOutlinePng, title: "我" }
  ];
  onShow() {
    // 小程序 hook
    Log.info("onShow");
  }

  mounted() {
    // vue hook
    Log.info("mounted");
  }
}

export default Index;
