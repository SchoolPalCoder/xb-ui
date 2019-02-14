<template>
  <div :class="classesDiv" :style="inputStyle">
    <input :class="classesInput" :placeholder="placeholder" :value="nativeValue" ref="input">
    <div v-if="!hidden" :class="classesSearchDiv" @click="handleClick">
      <xb-icon type="search"></xb-icon>
    </div>
    <div v-if="hidden" :class="classesSearchDivHidden" @click="handleClick">
      <xb-icon type="search"></xb-icon>
    </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
const prefixCls = "xbui-search-btn";
@Component({ name: "XbSearchBtn" })
export default class XbSearchBtn extends Vue {
  /** 传入的model值，必传 */
  @Prop({ default: "" })
  value!: any;

  // 默认输入文案
  @Prop({ default: "请输入..." })
  placeholder!: string;

  /** input样式 */
  @Prop()
  inputStyle!: object;

  /** 搜索input框尺寸，组件内提供3种 */
  @Prop({ default: "medium" })
  size!: string;

  /** 搜索icon的显示样式 */
  @Prop({ default: false })
  hidden!: boolean;

  nativeValue: any = this.value;
  // 搜索的点击事件
  handleClick() {
    this.nativeValue = this.$refs.input.value;
    this.$emit("click", this.nativeValue);
  }

  // 样式
  get classesDiv() {
    return [
      `${prefixCls}-div`,
      {
        [`${prefixCls}-div-large`]: this.size === "large",
        [`${prefixCls}-div-medium`]: this.size === "medium",
        [`${prefixCls}-div-small`]: this.size === "small",
      },
    ];
  }

  get classesInput() {
    return [`${prefixCls}-input`];
  }

  get classesSearchDiv() {
    return [
      `${prefixCls}-icon-div`,
      {
        [`${prefixCls}-icon-show`]: this.hidden === false,
      },
    ];
  }

  get classesSearchDivHidden() {
    return [
      `${prefixCls}-icon-div`,
      {
        [`${prefixCls}-icon-hidden`]: this.hidden === true,
      },
    ];
  }
}
</script>
