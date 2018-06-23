import { Vue, Component } from "vue-property-decorator";
import * as mpex from "@/mpex";
import Log from "@/logbox";
import { apiRequest, ApiRequestOptions } from "@/request-helpers";
import { isDev } from "@/utils";
import WeuiSearchBar from "@/components/weui/WeuiSearchBar.vue";
import WeuiLoadMore from "@/components/weui/WeuiLoadMore.vue";
import LoadingView from "@/components/LoadingView.vue";

interface GankListResponse<M> {
  error: boolean;
  results: M[];
}

/**
 * ListView UI 的四种主要状态
 */
export const enum ListViewState {
  /**
   * 加载中
   */
  loading = 1,
  /**
   * 主要的加载出错，这里没有包含加载更多出错，因为加载更多出错，不应该导致主要的
   * View 的状态变化
   */
  error,

  /**
   * 内容数据为空
   */
  nodata,
  /**
   * 显示内容主体
   */
  content
}

@Component({})
class ListVue<M> extends Vue {
  listItems: M[];
  isRefreshing = false;

  /**
   * 加载更多状态信息
   */
  loadMoreState = {
    nomore: false,
    loading: false
  };
  get shouldShowLoadMoreFooter(): boolean {
    return this.loadMoreState.loading || this.loadMoreState.nomore;
  }
  get isLoadingMore(): boolean {
    return this.loadMoreState.loading;
  }

  set isLoadingMore(value: boolean) {
    this.loadMoreState.loading = value;
  }

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

  /**
   * 当前 View 的状态，初始为 loading 状态
   */
  viewState = ListViewState.loading;

  /**
   *  默认出错错误提示消息
   */
  defaultErrorMessage = "请求出错";
  /**
   * 错误提示消息
   */
  errorMessage = "";

  get activeErrorMessage(): string {
    return this.errorMessage ? this.errorMessage : this.defaultErrorMessage;
  }

  /**
   * 数据为空时的提示
   */
  nodataMessage = "暂无数据";

  get isLoading(): boolean {
    return this.viewState === ListViewState.loading;
  }

  get hasError(): boolean {
    return this.viewState === ListViewState.error;
  }

  get nodata(): boolean {
    return this.viewState === ListViewState.nodata;
  }

  get hasContent(): boolean {
    return this.viewState === ListViewState.content;
  }

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
      Log.warn("already in Refreshing state");
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
    if (this.isLoadingMore) {
      Log.warn("already in LoadingMore state");
      return;
    }
    if (this.page > 20) {
      Log.warn(
        "如果有确实需要加载超过20页，请删除此处判断逻辑,不过真的需要吗？"
      );
      return;
    }
    this.isLoadingMore = true;
    this.page++;
    this.loadData();
  }

  async loadData() {
    const cleanup = () => {
      this.isRefreshing = false;
      this.isLoadingMore = false;
      this.isSearching = false;
      wx.stopPullDownRefresh();
    };
    if (this.page === 1) {
      this.loadMoreState.nomore = false;
    }
    try {
      const startTime = new Date().getTime();
      const resp = await apiRequest<GankListResponse<M>>(
        this.getApiRequestOptions()
      );
      const endTime = new Date().getTime();

      const done = () => {
        if (this.isLoadingMore) {
          this.listItems.push(...resp.results);
          this.loadMoreState.nomore = resp.results.length < this.pageSize;
        } else {
          this.listItems = resp.results;
        }
        if (this.listItems.length < 1) {
          this.switchToNodataState();
        } else {
          this.switchToContentState();
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
      if (this.isLoadingMore) {
        this.page--; // fallback
      }
      cleanup();
      const errorMessage = "请求出错:" + error;
      if (!this.isLoadingMore) {
        this.errorMessage = errorMessage;
        this.switchToErrorState();
      } else {
        mpex.showWarn(errorMessage);
      }
    }
  }

  switchToLoadingState() {
    this.viewState = ListViewState.loading;
  }

  switchToNodataState() {
    this.viewState = ListViewState.nodata;
  }

  switchToErrorState() {
    this.viewState = ListViewState.error;
  }

  switchToContentState() {
    this.viewState = ListViewState.content;
  }

  getApiRequestOptions(): ApiRequestOptions {
    if (isDev) {
      throw new Error("Please override this method");
    }
    return { url: "<please override this method>" };
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

  onTapReloadButton(e) {
    this.loadData();
  }

  get layoutState() {
    return {
      isRefreshing: this.isRefreshing,
      isLoading: this.isLoading,
      hasContent: this.hasContent,
      showSearchBar: this.showSearchBar,
      scrollViewStyle: this.scrollViewStyle,
      shouldShowLoadMoreFooter: this.shouldShowLoadMoreFooter,
      loadMoreState: this.loadMoreState,
      nodata: this.nodata,
      hasError: this.hasError,
      nodataMessage: this.nodataMessage,
      activeErrorMessage: this.activeErrorMessage
    };
  }

  /**
   * 搜索栏的输入框已经显示 (说明用户点击了搜索图标)
   */
  onSearchBarShowInput() {}

  /**
   * 用户点击了搜索栏的输入框右边的清除按钮。
   */
  onSearchBarClearInput() {}

  /**
   * 搜索输入栏的文字变化了
   */
  onSearchBarTextChange(newText: string) {
    Log.debug("SearchBar newText:", newText);
  }

  /**
   * 用户点击了搜索栏的取消按钮
   */
  onSearchBarCancel() {}

  onSearchBarConfirm(searchText: string) {
    Log.debug("SearchBar searchText:", searchText);
  }
}

export default ListVue;
