<template>
  <navigator
   :target="target"
   :url="url"
   :open-type="openType"
   :delta="delta"
   :app-id="appId"
   :path="path"
   :extra-data="extraData"
   :version="version"
   :hover-class="hoverClass"
   :hover-stop-propagation="hoverStopPropagation"
   :hover-start-time="hoverStartTime"
   :hover-stay-time="hoverStayTime"
   class="weui-cell weui-cell_access"
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
</navigator>
</template>
<script>
export default {
  props: {
    target: String, // 在哪个目标上发生跳转，默认当前小程序2.0.7
    url: String, // 当前小程序内的跳转链接
    openType: {
      // 跳转方式
      type: String,
      default: "navigate"
    },
    delta: Number, // 当 open-type 为 'navigateBack' 时有效，表示回退的层数
    appId: String, // 当target="miniProgram"时有效，要打开的小程序 appId
    path: String, // 当target="miniProgram"时有效，打开的页面路径，如果为空则打开首页
    extraData: Object, // 当target="miniProgram"时有效，需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据。详情
    version: {
      type: String, // 当target="miniProgram"时有效，要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版），仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是正式版，则打开的小程序必定是正式版。
      default: "release"
    },
    hoverClass: {
      // 指定点击时的样式类，当hover-class="none"时，没有点击态效果
      type: String,
      default: "navigator-hover"
    },
    hoverStopPropagation: {
      // 指定是否阻止本节点的祖先节点出现点击态
      type: Boolean,
      default: false
    },
    hoverStartTime: {
      // 按住后多久出现点击态，单位毫秒
      type: Number,
      default: 50
    },
    hoverStayTime: {
      // 手指松开后点击态保留时间，单位毫秒
      type: Number,
      default: 600
    },
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
