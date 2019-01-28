<template>
  <button :class="classes" @click="handleClick" :disabled="disabled">
    <xb-icon v-if="icon" :type="icon"></xb-icon>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import Locale from "../../../src/mixins/locale";

const prefixCls = "xbui-button";
@Component({ name: "XbButton", mixins: [Locale] })
export default class XbButton extends Vue {
  /** 按钮样式 */
  @Prop({ type: String, default: "default" })
  type!: string;

  /** 按钮尺寸 */
  @Prop({ type: String, default: "medium" })
  size!: string;

  /** icon配置 */
  @Prop()
  icon!: string;

  /** 是否禁用 */
  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  /** 是否为长按钮 */
  @Prop({ type: Boolean, default: false })
  long!: boolean;

  // 点击事件
  handleClick(event: void) {
    this.$emit("click", event);
  }

  get classes() {
    return [
      {
        [`${prefixCls}`]: true,
        [`${prefixCls}-${this.size}`]: true,
        [`${prefixCls}-disabled`]: this.disabled,
        [`${prefixCls}-${this.type}`]: this.size !== "default",
        [`${prefixCls}-long`]: this.long,
      },
    ];
  }
}
</script>
