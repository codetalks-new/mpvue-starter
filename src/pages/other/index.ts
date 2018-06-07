import { Vue, Component } from "vue-property-decorator";
import * as store from "@/store";
import eventBus from "@/eventBus";
import * as mpex from "@/mpex";
import Log from "@/logbox";

// 必须使用装饰器的方式来指定component
@Component({})
class Index extends Vue implements mp.VueLifecycle, mp.PageLifecycle {
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
