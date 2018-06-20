<template>
  <div class="loading">
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="less">
@import "~@/styles/loading.less";
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
