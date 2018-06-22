<template>
  <div class="page">
    <div class="list-view-wrapper">
      <loading-view v-if="isRefreshing" />
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
      <weui-load-more v-if="isLoadMore" />
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts">
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
