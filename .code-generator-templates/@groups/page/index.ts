import { Vue, Component } from "vue-property-decorator";
import * as store from "@/store";
import eventBus from "@/eventBus";
import * as mpex from "@/mpex";

// 必须使用装饰器的方式来指定component
@Component({})
class Index extends Vue implements mp.VueLifecycle, mp.PageLifecycle {
  onShow() {
    // 小程序 hook
    log.info("onShow");
  }

  mounted() {
    // vue hook
    log.info("mounted");
  }
}

export default Index;
