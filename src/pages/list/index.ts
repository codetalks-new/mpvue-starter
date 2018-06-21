import { Vue, Component } from "vue-property-decorator";
import * as store from "@/store";
import eventBus from "@/eventBus";
import * as mpex from "@/mpex";
import Log from "@/logbox";
import WeuiSearchBar from "@/components/weui/WeuiSearchBar.vue";
import WeuiLoadMore from "@/components/weui/WeuiLoadMore.vue";
import LoadingView from "@/components/LoadingView.vue";
import { apiRequest, ApiRequestOptions } from "@/request-helpers";

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
interface GankListResponse<M> {
  error: boolean;
  results: M[];
}

@Component({})
class ListVue<M> extends Vue {
  listItems: M[];
  isRefreshing = false;
  isLoadMore = false;
  isSearching = false;
  pageSize = 10;
  page = 1;
  showSearchBar = false;
  windowHeight = 667; // 默认按 iPhone 6 高度
  // Note Scroll View 必须要指定 Height 才行.
  scrollViewHeight = 572; // px
  get scrollViewStyle(): string {
    const rpx = this.scrollViewHeight * 2;
    return `height:${rpx}rpx;`;
  }

  created() {
    const sinfo = wx.getSystemInfoSync();
    this.windowHeight = sinfo.windowHeight;
    //  不用减 navbar 27 的高度，因为 navbar 是绝对布局的
    this.scrollViewHeight = sinfo.windowHeight;
  }

  refreshData() {
    this.page = 1;
    this.loadData();
  }

  loadMoreData() {
    this.page++;
    this.loadData();
  }

  async loadData() {
    try {
      this.isRefreshing = true;
      const resp = await apiRequest<GankListResponse<M>>(
        this.getApiRequestOptions()
      );
      this.listItems = resp.results;
      this.isRefreshing = false;
    } catch (error) {
      this.isRefreshing = false;
      mpex.showWarn(error);
    }
  }

  getApiRequestOptions(): ApiRequestOptions {
    return { url: "<override this method>" };
  }
}

@Component({
  components: {
    LoadingView,
    WeuiLoadMore,
    WeuiSearchBar
  }
})
class Index extends ListVue<Welfare> {
  // 如果不加这行声明， Vue 绑定的时候找不到 listItems
  listItems: Welfare[] = [];
  onLoad() {
    this.refreshData();
  }

  getApiRequestOptions() {
    const url = `http://gank.io/api/data/福利/${this.pageSize}/${this.page}`;
    return {
      url
    };
  }

  bindScrollToTop() {
    this.refreshData();
  }

  bindScrollToBottom() {
    this.loadMoreData();
  }
}

export default Index;
