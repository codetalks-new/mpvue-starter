<template>
  <!--  注意 由于 MPVUE 对于 slot 的支持不完善，所以此组件暂时不可用，谢谢-->
  <div class="page">
    <loading-view v-if="state.isRefreshing || state.isLoading" />
    <div v-if="state.hasContent"
         class="list-view-wrapper">
      <weui-search-bar v-if="state.showSearchBar" />
      <scroll-view class="list-view"
                   scroll-y
                   upper-threshold="80"
                   lower-threshold="140"
                   @scrolltoupper="bindScrollToTop"
                   @scrolltolower="bindScrollToBottom"
                   :style="state.scrollViewStyle">
        <slot>
          <span>Mpvue 对于 slot 支持还不太好</span>
        </slot>
      </scroll-view>
      <weui-load-more v-if="state.shouldShowLoadMoreFooter"
                      :loading="state.loadMoreState.loading"
                      :nomore="state.loadMoreState.nomore" />
    </div>
    <div v-if="state.nodata || state.hasError"
         class="list-msg-box weui-msg">
      <view class="weui-msg__icon-area">
        <icon type="info"
              size="64"></icon>
      </view>
      <view class="weui-msg__text-area">
        <view v-if="state.nodata"
              class="weui-msg__title">{{state.nodataMessage}}</view>
        <view v-if="state.hasError"
              class="weui-msg__title">{{state.activeErrorMessage}}</view>
      </view>
      <view class="weui-msg__opr-area">
        <view class="weui-btn-area">
          <button class="weui-btn"
                  @tap="onTapReloadButton"
                  type="primary">重试?</button>
        </view>
      </view>
    </div>
  </div>
</template>
<script>
import WeuiSearchBar from "@/components/weui/WeuiSearchBar.vue";
import WeuiLoadMore from "@/components/weui/WeuiLoadMore.vue";
import LoadingView from "@/components/LoadingView.vue";
export default {
  components: {
    LoadingView,
    WeuiLoadMore,
    WeuiSearchBar
  },
  props: {
    state: Object
  },
  methods: {
    onTapReloadButton() {
      this.$emit("reload");
      // this.$parent.loadData();
    },
    bindScrollToTop() {
      this.$emit("scrolltoupper");
    },
    bindScrollToBottom() {
      this.$emit("scrolltolower");
    }
  }
};
</script>

<style lang="less">
@import "~@/styles.less";
.page {
  background: #f3f3f3;
}
.list-view-wrapper {
  height: 100%;
}
</style>
