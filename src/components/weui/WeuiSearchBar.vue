<template>
  <view class="weui-search-bar">
    <view class="weui-search-bar__form">
      <view class="weui-search-bar__box">
        <icon class="weui-icon-search_in-box"
              type="search"
              size="14"></icon>
        <input class="weui-search-bar__input"
               type="text"
               :placeholder="placeholder"
               :value="inputVal"
               :focus="inputShowed"
               @input="inputTyping" />
        <view class="weui-icon-clear"
              v-show="inputVal.length > 0"
              @tap="clearInput">
          <icon type="clear"
                size="14"></icon>
        </view>
      </view>
      <label class="weui-search-bar__label"
             v-show="!inputShowed"
             @tap="showInput">
        <icon class="weui-icon-search"
              type="search"
              size="14"></icon>
        <view class="weui-search-bar__text">{{placeholder}}</view>
      </label>
    </view>
    <view class="weui-search-bar__cancel-btn"
          v-show="inputShowed"
          @tap="onTapCancelButton">取消</view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      inputShowed: false,
      inputVal: ""
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "搜索"
    }
  },
  watch: {},
  methods: {
    showInput() {
      this.inputShowed = true;
      this.$emit("show-input");
    },
    hideInput() {
      this.inputVal = "";
      this.inputShowed = false;
    },
    clearInput() {
      this.inputVal = "";
      this.$emit("clear-input");
      this.$emit("change", this.inputVal);
    },
    inputTyping(e) {
      this.inputVal = e.mp.detail.value;
      this.$emit("change", this.inputVal);
    },
    onTapCancelButton(e) {
      this.hideInput();
      this.$emit("cancel", e);
    }
  }
};
</script>

<style lang="less">
</style>
