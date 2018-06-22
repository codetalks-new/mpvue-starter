<template>
  <div class="page">
    <loading-view v-if="isRefreshing || isLoading" />
    <div v-if="hasContent"
         class="list-view-wrapper">
      <weui-search-bar v-if="showSearchBar" />
      <scroll-view class="list-view"
                   scroll-y
                   upper-threshold="80"
                   lower-threshold="140"
                   @scrolltoupper="bindScrollToTop"
                   @scrolltolower="bindScrollToBottom"
                   :style="scrollViewStyle">
        <div class="post-item"
             v-for="(item,index) in listItems"
             :key="index">
          <div class="post-title">{{item.desc}}</div>
        </div>
      </scroll-view>
      <weui-load-more v-if="shouldShowLoadMoreFooter"
                      :loading="loadMoreState.loading"
                      :nomore="loadMoreState.nomore" />
    </div>
    <div v-if="nodata || hasError"
         class="list-msg-box weui-msg">
      <view class="weui-msg__icon-area">
        <icon type="info"
              size="64"></icon>
      </view>
      <view class="weui-msg__text-area">
        <view v-if="nodata"
              class="weui-msg__title">{{nodataMessage}}</view>
        <view v-if="hasError"
              class="weui-msg__title">{{activeErrorMessage}}</view>
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

<style>
page {
  background-color: #ffffff;
}
</style>
<script>
import wepy from "wepy";
export default class MsgSuccess extends wepy.page {}
</script>

<script lang="ts" src="./index.ts">
import wepy from "wepy";
export default class MsgSuccess extends wepy.page {}
</script>

<style lang="less">
@import "~@/styles.less";
.page {
  background: #f3f3f3;
}
.list-view-wrapper {
  height: 100%;
}

.post-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 8px;
  border-radius: 4px;
  box-shadow: 1px 2px 2px 1px rgba(0, 0, 0, 0.01);
  background: #fff;
  padding: 4px 6px;
  &-title {
    font-size: 13px;
    color: #333;
  }
}
</style>
