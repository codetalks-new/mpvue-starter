<template  lang="nunjucks">
  {% extends "src/templates/base-list-vue-layout.jinja2" %}
  {% block listItems %}
  <div class="post-item"
       v-for="(item,index) in listItems"
       :key="index">
    <div class="post-title">{%raw%}{{item.desc}}{% endraw %}</div>
  </div>
  {% endblock %}
</template>

<style>
page {
  background-color: #ffffff;
}
</style>

<script lang="ts" src="./index.ts">
</script>

<style lang="less">
@import "~@/styles.less";
.page {
  background: #f3f3f3;
}
.list-view-wrapper {
  height: 100%;
}

.post-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 8px;
  border-radius: 4px;
  box-shadow: 1px 2px 2px 1px rgba(0, 0, 0, 0.01);
  background: #fff;
  padding: 4px 6px;
  &-title {
    font-size: 13px;
    color: #333;
  }
}
</style>
