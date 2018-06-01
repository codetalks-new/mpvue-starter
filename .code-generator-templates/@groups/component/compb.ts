import { Vue, Component, Prop } from "vue-property-decorator";

// 必须使用装饰器的方式来指定component
@Component({})
class CompB extends Vue implements mp.VueLifecycle {
  @Prop({ default: "1" }) //注意用法！
  text: string;

  ver: number = 2;

  mounted() {
    // vue hook
  }
}

export default CompB;
