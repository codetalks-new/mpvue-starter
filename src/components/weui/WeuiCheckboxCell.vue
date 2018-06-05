<template>
<view class="weui-cell weui-cell_switch">
  <view class="weui-cell__bd">{{title}}</view>
  <view class="weui-cell__ft">
    <switch
    :checked="checked"
    :color="color"
    @change="bindchange"
    type="checkbox"
    ></switch>
  </view>
</view>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    checked: Boolean, // 是否选中 默认 false
    color: String, // switch样式，有效值：switch, checkbox
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    /**
     * checked 改变时触发 change 事件，event.detail={ value:checked}
     */
    bindchange(e) {
      this.$emit("change", e);
    }
  }
};
</script>

<style lang="less">
</style>
