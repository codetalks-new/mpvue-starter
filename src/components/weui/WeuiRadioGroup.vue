<template>
<div>
<view class="weui-cells__title">{{title}}</view>
<view class="weui-cells weui-cells_after-title">
  <radio-group @change="radioChange">
    <label class="weui-cell weui-check__label" v-for="item in radioItems" :key="item.value">
      <radio class="weui-check" :value="item.value" :checked="item.checked" />
      <view class="weui-cell__bd">{{item.name}}</view>
      <view class="weui-cell__ft weui-cell__ft_in-radio" v-show="item.checked">
        <icon class="weui-icon-radio" type="success_no_circle" size="16"></icon>
      </view>
    </label>
  </radio-group>
</view>
</div>
</template>
<script>
export default {
  data() {
    return {
      radioItems: this.items
    };
  },
  props: {
    title: String,
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    radioChange(e) {
      const value = e.mp.detail.value;
      console.info("radioChange ", value);
      this.radioItems.forEach(item => {
        item.checked = item.value === value;
      });
      this.$emit("change");
    }
  }
};
</script>

<style lang="less">
</style>
