<template lang="nunjucks">
{% extends "src/templates/base-list-vue-layout.jinja2" %}
{% block listItems %}
        <div class="welfare"
             v-for="(item,index) in listItems"
             :key="index">
          <image class="welfare-img"
                 @tap="onTapImg(item)"
                 mode="aspectFill"
                 :src="item.url" />
        </div>
{% endblock %}
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
