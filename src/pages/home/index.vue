<template>
  <div class="page">
    <weui-search-bar placeholder="搜索球星"
                     @change="onSearchBarTextChanged"
                     @show-input="onSearchBarShowInput"
                     @clear-input="onSearchBarClearInput"
                     @cancel="onCancelSearch" />
    <weui-cell-group title="WeuiCell 使用示例">
      <weui-nav-cell hover-class="navigator-hover"
                     url="/pages/tabbar_demo/main"
                     title="TabBar 示例" />
      <weui-cell title="标题文案"
                 detail="说明文案" />
      <weui-cell icon="/static/images/ic_warn_outline.png"
                 title="标题文案"
                 detail="说明文案" />
      <weui-cell title="标题文案"
                 access="true" />
      <weui-cell title="标题文案"
                 detail="说明文字"
                 access="true" />
      <weui-cell icon="/static/images/ic_warn_outline.png"
                 title="标题文案"
                 detail="说明文案"
                 access/>
    </weui-cell-group>
    <weui-cell-group title="WeuiInputCell 使用示例">
      <weui-input-cell label="QQ"
                       placeholder="请输入 QQ 号"
                       @focus="bindfocus"
                       @blur="bindblur"
                       @confirm="bindconfirm"
                       @input="bindinput"
                       value="123" />
    </weui-cell-group>
    <weui-cell-group title="开关组件">
      <weui-switch-cell title="开头说明" />
      <weui-switch-cell title="兼容模式"
                        checked />
      <weui-checkbox-cell title="南瓜" />
      <weui-checkbox-cell title="大西瓜"
                          checked />
    </weui-cell-group>

    <weui-radio-group title="请选择地区"
                      :items="items" />

    <weui-cell-group title="加载状态组件">
      <loading-view/>
    </weui-cell-group>

    <weui-load-more loading/>
    <weui-load-more nodata/>
    <weui-load-more nomore/>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<style lang="less">
@import "~@/styles.less";
.navigator-hover {
  color: blue;
}
</style>
