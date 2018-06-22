import { Vue, Component } from "vue-property-decorator";
import WeuiSearchBar from "@/components/weui/WeuiSearchBar.vue";
import WeuiLoadMore from "@/components/weui/WeuiLoadMore.vue";
import LoadingView from "@/components/LoadingView.vue";
import ListVue from "@/ListVue";

const demoItem = {
  _id: "5b196d0b421aa910ab3d6b3c",
  createdAt: "2018-06-08T01:36:11.740Z",
  desc: "2018-06-08",
  publishedAt: "2018-06-08T00:00:00.0Z",
  source: "web",
  type: "\u798f\u5229",
  url: "http://ww1.sinaimg.cn/large/0065oQSqly1fs34w0jx9jj30j60ootcn.jpg",
  used: true,
  who: "lijinshanmx"
};

type Welfare = typeof demoItem;

@Component({
  components: {
    LoadingView,
    WeuiLoadMore,
    WeuiSearchBar
  }
})
class Index extends ListVue<Welfare> implements mp.PageLifecycle {
  // 如果不加这行声明， Vue 绑定的时候找不到 listItems
  listItems: Welfare[] = [];
  onLoad() {
    this.isRefreshing = true; // showLoading
    this.loadData();
  }

  getApiRequestOptions() {
    const url = `http://gank.io/api/data/福利/${this.pageSize}/${this.page}`;
    return {
      url
    };
  }

  onTapImg(welfare: Welfare) {
    const allUrls = this.listItems.map(it => it.url);
    const previewUrls = allUrls.filter(it => it != welfare.url);
    previewUrls.unshift(welfare.url);
    wx.previewImage({
      urls: previewUrls
    });
  }
}

export default Index;
