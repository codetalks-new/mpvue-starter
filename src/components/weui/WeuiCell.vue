<template>
<div class="weui-cell weui-cell_access" hover-class="weui-cell_active"
   :class="{'weui-cell_access': access}"
>
  <view class="weui-cell__hd" v-if="icon">
    <image class="hd-icon" :src="icon"/>
  </view>
  <view class="weui-cell__bd"> {{title}}</view>
  <view
    v-if="detail || access"
   class="weui-cell__ft"
   :class="{'weui-cell__ft_in-access': access}"
  >{{detail}}</view>
</div>
</template>
<script>
export default {
  props: {
    icon: String,
    title: String,
    detail: String,
    access: String
  }
};
</script>

<style lang="less">
.hd-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  vertical-align: middle;
}
</style>
