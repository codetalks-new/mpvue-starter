import { Vue, Component } from "vue-property-decorator";
import WeuiSearchBar from "@/components/weui/WeuiSearchBar.vue";
import WeuiLoadMore from "@/components/weui/WeuiLoadMore.vue";
import LoadingView from "@/components/LoadingView.vue";
import ListVue from "@/ListVue";

const postDemo = {
  _id: "5b2c64db421aa923c0fbfdd1",
  createdAt: "2018-06-22T10:54:19.534Z",
  desc:
    "\u4e00\u4e2a\u53ef\u7231\u7684\u5c0f\u5154\u5b50\u52a8\u753b\uff0c\u54cd\u5e94\u6587\u672c\u5b57\u6bb5\u7684\u4ea4\u4e92\u3002",
  images: ["http://img.gank.io/53425685-b1b2-4d60-a0c1-dfc4f00d4fd4"],
  publishedAt: "2018-06-22T00:00:00.0Z",
  source: "chrome",
  type: "Android",
  url: "https://github.com/omar753sahl/Flopsy",
  used: true,
  who: "lijinshanmx"
};

type Post = typeof postDemo;

@Component({
  components: {
    LoadingView,
    WeuiLoadMore,
    WeuiSearchBar
  }
})
class Index extends ListVue<Post> implements mp.PageLifecycle {
  // 如果不加这行声明， Vue 绑定的时候找不到 listItems
  listItems: Post[] = [];
  onLoad() {
    this.isRefreshing = true; // showLoading
    this.loadData();
  }

  getApiRequestOptions() {
    const url = `http://gank.io/api/data/Android/${this.pageSize}/${this.page}`;
    return {
      url
    };
  }
}

export default Index;
