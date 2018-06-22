import { Vue, Component } from "vue-property-decorator";
import * as mpex from "@/mpex";
import Log from "@/logbox";
import { apiRequest, ApiRequestOptions } from "@/request-helpers";

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
    if (this.isRefreshing) {
      Log.warn("isRefreshing");
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
    if (this.isLoadMore) {
      Log.warn("isLoadMore");
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
      wx.stopPullDownRefresh();
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

  /**
   * ScrollView 触顶回调
   */
  bindScrollToTop() {
    this.refreshData();
  }

  /**
   * ScrollView 的触底回调
   */
  bindScrollToBottom() {
    this.loadMoreData();
  }

  /**
   * 小程序页面页面下拉刷新回调
   *  需要在 window 或者页面配置中开启 enableDownRefresh
   * 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
   */
  onPullDownRefresh() {
    const showLoadingView = false;
    this.refreshData(showLoadingView);
  }

  /**
   * 小程序页面触底回调
   * 可以在app.json的window选项中或页面配置中设置触发距离onReachBottomDistance。
   * 在触发距离内滑动期间，本事件只会被触发一次。
   */
  onReachBottom() {
    this.loadMoreData();
  }
}

export default ListVue;
