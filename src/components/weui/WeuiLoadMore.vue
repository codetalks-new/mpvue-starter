<template>
  <div class="load-more-footer">
    <view v-if="loading" class="weui-loadmore">
      <view class="weui-loading"></view>
      <view class="weui-loadmore__tips">正在加载</view>
    </view>
    <view v-if="nodata" class="weui-loadmore weui-loadmore_line">
      <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
    </view>
    <view v-if="nomore" class="weui-loadmore weui-loadmore_line weui-loadmore_dot">
      <view class="weui-loadmore__tips weui-loadmore__tips_in-line weui-loadmore__tips_in-dot"></view>
    </view>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    nomore: Boolean, // 没有更多了
    nodata: Boolean, // 没有数据
    loading: Boolean // 加载中
  },
  watch: {},
  methods: {}
};
</script>

<style lang="less">
</style>
