<template>
  <view class="weui-cell weui-cell_input">
    <view class="weui-cell__hd"
          v-if="label">
      <view class="weui-label">{{label}}</view>
    </view>
    <view class="weui-cell__bd">
      <input class="weui-input"
             type="text"
             v-model="inputValue"
             :password="password"
             :placeholder="placeholder"
             :placeholder-style="placeholderStyle"
             :placeholder-class="placeholderClass"
             :disabled="disabled"
             :maxlength="maxlength"
             :cursor-spacing="cursorSpacing"
             :focus="focus"
             :confirm-type="confirmType"
             :confirm-hold="confirmHold"
             :cursor="cursor"
             :selection-start="selectionStart"
             :selection-end="selectionEnd"
             :adjust-position="adjustPosition"
             @focus="bindfocus"
             @blur="bindblur"
             @confirm="bindconfirm" />
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      inputValue: this.value
    };
  },
  props: {
    label: String,
    // 以下皆是 Input 属性.
    value: String,
    // mpvue 不支持动态的 type 类型
    // type: {
    //   // input 的类型 ,可选值 text,number, idcard, digit
    //   type: String,
    //   default: "text"
    // },
    password: Boolean, // 是否是密码类型
    placeholder: {
      // 输入框为空时占位符
      type: String,
      default: "请输入"
    },
    placeholderStyle: String, // 指定 placeholder 的样式
    placeholderClass: String, // 指定 placeholder 的样式类
    disabled: Boolean, // 是否禁用
    maxlength: {
      // 最大输入长度，设置为 -1 的时候不限制最大长度
      type: Number,
      default: 140
    },
    cursorSpacing: {
      // 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的
      // 距离的最小值作为光标与键盘的距离
      type: Number,
      default: 0
    },
    focus: Boolean, // 获取焦点
    confirmType: {
      // 设置键盘右下角按钮的文字,可选值  send, search, next,go,done
      type: String,
      default: "done"
    },
    confirmHold: Boolean, // 点击键盘右下角按钮时是否保持键盘不收起
    cursor: Number, // 指定focus时的光标位置
    selectionStart: {
      // 光标起始位置，自动聚集时有效，需与selection-end搭配使用
      type: Number,
      default: -1
    },
    selectionEnd: {
      // 光标结束位置，自动聚集时有效，需与selection-start搭配使用
      type: Number,
      default: -1
    },
    adjustPosition: {
      // 键盘弹起时，是否自动上推页面 @since 1.9.90
      type: Boolean,
      default: true
    }
  },
  watch: {
    inputValue(val) {
      this.$emit("input", val);
      console.info("current value:", val);
    }
  },
  methods: {
    mounted() {
      console.info("WeuiInputCell created");
    },
    bindfocus(e) {
      this.$emit("focus", e);
    },
    bindblur(e) {
      this.$emit("blur", e);
    },
    bindconfirm(e) {
      this.$emit("confirm", e);
    }
  }
};
</script>

<style lang="less">
</style>
