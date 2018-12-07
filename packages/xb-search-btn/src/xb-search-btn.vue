<template>
  <div
    :class="classesDiv"
    :style="inputStyle"
  >
    <input
      :class="classesInput"
      :placeholder="placeholder"
    />

    <div
      v-if="!hidden"
      :class="classesSearchDiv"
    >
      <i class="xb-icon-search"></i>
    </div>

    <div
      v-if="hidden"
      :class="classesSearchDivHidden"
    >
      <i class="xb-icon-search"></i>
    </div>

    <div style="clear:both;"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
const prefixCls = "xbui-search-btn";
@Component({ name: "XbSearchBtn" })
export default class XbSearchBtn extends Vue {
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
