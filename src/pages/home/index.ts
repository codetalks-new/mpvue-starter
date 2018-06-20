import { Vue, Component } from "vue-property-decorator";
import Log from "@/logbox";
import WeuiCell from "@/components/weui/WeuiCell.vue";
import WeuiNavCell from "@/components/weui/WeuiNavCell.vue";
import WeuiInputCell from "@/components/weui/WeuiInputCell.vue";
import WeuiSwitchCell from "@/components/weui/WeuiSwitchCell.vue";
import WeuiCheckboxCell from "@/components/weui/WeuiCheckboxCell.vue";
import WeuiRadioGroup from "@/components/weui/WeuiRadioGroup.vue";
import WeuiCellGroup from "@/components/weui/WeuiCellGroup.vue";
import WeuiLoadMore from "@/components/weui/WeuiLoadMore.vue";
import LoadingView from "@/components/LoadingView.vue";

// 必须使用装饰器的方式来指定component
@Component({
  components: {
    WeuiCell,
    WeuiNavCell,
    WeuiInputCell,
    WeuiCheckboxCell,
    WeuiSwitchCell,
    WeuiRadioGroup,
    WeuiCellGroup,
    LoadingView,
    WeuiLoadMore
  }
})
class Index extends Vue implements mp.VueLifecycle, mp.PageLifecycle {
  items = [
    { name: "USA", value: "美国", checked: false },
    { name: "CHN", value: "中国", checked: true },
    { name: "BRA", value: "巴西", checked: false },
    { name: "JPN", value: "日本", checked: false },
    { name: "ENG", value: "英国", checked: false },
    { name: "TUR", value: "法国", checked: false }
  ];
  texts: string[] | null = [];
  onShow() {
    // 小程序 hook
    Log.info("onShow");
  }

  mounted() {
    // vue hook
    Log.info("mounted");
  }

  bindinput(e) {
    console.info("bindinput ", e);
  }
  bindfocus(e) {
    Log.info("bindfocus ", e);
  }
  bindblur(e) {
    Log.info("bindblur ", e);
  }
  bindconfirm(e) {
    Log.info("bindconfirm ", e);
  }
}

export default Index;
