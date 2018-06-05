<template>
  <div class="page">
    <view class="weui-cells__title">WeuiCell 使用示例</view>
    <view class="weui-cells weui-cells_after-title">
      <weui-cell title="标题文案"  detail="说明文案" />
      <weui-cell icon="/static/images/ic_warn_outline.png" title="标题文案"  detail="说明文案" />
      <weui-cell title="标题文案"  access="true"/>
      <weui-cell title="标题文案" detail="说明文字"  access="true"/>
      <weui-cell icon="/static/images/ic_warn_outline.png" title="标题文案"  detail="说明文案" access/>
    </view>
    <view class="weui-cells__title">WeuiCell 使用示例</view>
    <view class="weui-cells weui-cells_after-title">
      <weui-input-cell label="QQ" placeholder="请输入 QQ 号"
        @focus="bindfocus"
        @blur="bindblur"
        @confirm="bindconfirm"
        @input="bindinput"
        value="123"
      />
      <weui-switch-cell title="开头说明" />
      <weui-switch-cell title="兼容模式" checked />
      <weui-checkbox-cell title="南瓜" />
      <weui-checkbox-cell title="大西瓜" checked />
      <weui-radio-group title="请选择地区" :items="items" />
    </view>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less">
@import "~@/styles.less";
</style>
