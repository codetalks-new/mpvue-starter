<template>
  <div>

  </div>
</template>
<!--必须指定为ts-->
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

// 必须使用装饰器的方式来指定component
@Component({})
class {{name}} extends Vue implements mp.VueLifecycle{
  @Prop({ default: "1" }) //注意用法！
  text: string;


  onShow() {}

  onHide() {}

  mounted() {
    // vue hook
  }
}

export default {{name}};
</script>

<style lang="less">
</style>
