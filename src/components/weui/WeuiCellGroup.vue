<template>
<view>
  <view class="weui-cells__title" v-if="title">{{title}}</view>
  <view class="weui-cells" :class="{'weui-cells_after-title': title}">
    <slot></slot>
  </view>
</view>
</template>
<script>
export default {
  props: {
    title: String
  }
};
</script>

<style lang="less">
</style>
