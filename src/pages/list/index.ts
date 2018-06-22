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
  /**
   * 是否显示 SearchBar
   */
  showSearchBar = false;
  windowHeight = 667; // 默认按 iPhone 6 高度
  /**
   * 是否启用上拉加载更多
   */
  enableLoadMore = true;

  /**
   * 是否启用下拉刷新
   */
  enablePullDownRefresh = true;
  /**
   *
   * ScrollView 高度
   * Scroll View 必须要指定 Height 才可以触发，触顶，触底等事件
   */
  scrollViewHeight = 572; // px
  /**
   * loading 等指示至少显示时间，以勉请求比较快时一晃而过
   */
  graceMillis = 1000; // one second
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

  refreshData(showLoadingView: boolean = true) {
    if (!this.enablePullDownRefresh) {
      Log.warn("PullDownRefresh was disabled");
      return;
    }
    this.isRefreshing = showLoadingView;
    this.page = 1;
    this.loadData();
  }

  loadMoreData() {
    if (!this.enableLoadMore) {
      Log.warn("LoadMore was disabled");
      return;
    }
    if (this.page > 20) {
      Log.warn(
        "如果有确实需要加载超过20页，请删除此处判断逻辑,不过真的需要吗？"
      );
      return;
    }
    this.isLoadMore = true;
    this.page++;
    this.loadData();
  }

  async loadData() {
    const cleanup = () => {
      this.isRefreshing = false;
      this.isLoadMore = false;
      this.isSearching = false;
    };
    try {
      const startTime = new Date().getTime();
      const resp = await apiRequest<GankListResponse<M>>(
        this.getApiRequestOptions()
      );
      const endTime = new Date().getTime();

      const done = () => {
        if (this.isLoadMore) {
          this.listItems.push(...resp.results);
        } else {
          this.listItems = resp.results;
        }
        cleanup();
      };

      const elapsed = endTime - startTime;
      if (elapsed > 1000) {
        done();
      } else {
        setTimeout(done, 1000 - elapsed);
      }
    } catch (error) {
      if (this.isLoadMore) {
        this.page--; // fallback
      }
      cleanup();
      mpex.showWarn(error);
    }
  }

  getApiRequestOptions(): ApiRequestOptions {
    return { url: "<override this method>" };
  }

  // 建议使用小程序页面的下拉刷新功能， scrollview 的下拉刷新体验不太好.
  bindScrollToTop() {
    this.refreshData();
  }

  // 建议使用小程序页面的 onReachBottom 相关回调可能体验会好一些。
  bindScrollToBottom() {
    this.loadMoreData();
  }

  /**
   * 小程序页面页面下拉刷新回调
   */
  onPullDownRefresh() {
    const showLoadingView = false;
    this.refreshData(showLoadingView);
  }

  /**
   * 小程序页面触底回调
   */
  onReachBottom() {
    this.loadMoreData();
  }
}

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
    this.refreshData();
  }

  getApiRequestOptions() {
    const url = `http://gank.io/api/data/福利/${this.pageSize}/${this.page}`;
    return {
      url
    };
  }
}

export default Index;
