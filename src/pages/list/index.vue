<template>
  <div class="page">
    <div class="list-view-wrapper">
      <loading-view v-if="isRefreshing" />
      <weui-search-bar v-if="showSearchBar" />
      <scroll-view class="list-view"
                   scroll-y
                   upper-threshold="80"
                   lower-threshold="80"
                   @scrolltoupper="bindScrollToTop"
                   @scrolltolower="bindScrollToBottom"
                   :style="scrollViewStyle">
        <div class="welfare"
             v-for="(item,index) in listItems"
             :key="index">
          <image class="welfare-img"
                 mode="aspectFill"
                 :src="item.url" />
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
  background: #000;
}
.list-view-wrapper {
  height: 100%;
}

.welfare {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 4px;

  &-img {
    border-radius: 4px;
    width: 320px;
    height: 384px;
    box-shadow: 1px 2px 2px 1px rgba(0, 0, 0, 0.01);
  }
}
</style>
