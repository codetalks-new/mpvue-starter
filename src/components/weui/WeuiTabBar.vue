<template>
  <view class="weui-tabbar">
    <view class="weui-tabbar__item" v-for="(item,index) in items" :key="index" :class="{'weui-bar__item_on': index==selectedIndex}" @tap="onTapTab(index)">
      <span v-if="item.badge" style="display: inline-block;position: relative;">
        <image :src="item.icon" class="weui-tabbar__icon" />
        <span v-if="item.badge != -1" class="weui-badge" style="position: absolute;top: -2px;right: -13px;">{{item.badge}}</span>
        <span v-else class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>
      </span>
      <image v-else :src="item.icon" class="weui-tabbar__icon" />
      <p class="weui-tabbar__label">{{item.title}}</p>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      selectedIndex: this.activeIndex
    };
  },
  props: {
    items: Array,
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onTapTab(index) {
      if (index !== this.selectedIndex) {
        this.selectedIndex = index;
        this.$emit("change", index);
      }
    }
  }
};
</script>

<style lang="less">
</style>
