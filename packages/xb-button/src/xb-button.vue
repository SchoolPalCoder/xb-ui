<template>
  <button
    class="xb-button"
    :class="[disabled?'xb-button-disabled':'',type ? 'xb-button-' + type : '','xb-button-' + size,long?'xb-button-long':'']"
    @click="handleClick"
    :disabled="disabled"
    :type="nativeType"
  >
    <i :class="icon" v-if="icon"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import Locale from "../../../src/mixins/locale";

@Component({
  mixins: [Locale],
})
export default class XbButton extends Vue {
  /** 按钮样式 */
  @Prop({ default: "default" })
  type!: string;

  /** 按钮尺寸 */
  @Prop({ default: "medium" })
  size!: string;

  /** icon配置 */
  @Prop()
  icon!: string;

  /** 按钮类型 */
  @Prop({ default: "button" })
  nativeType!: string;

  /** 是否禁用 */
  @Prop({ default: false })
  disabled!: boolean;

  /** 是否为长按钮 */
  @Prop({ default: false })
  long!: boolean;

  // 按钮计数
  times: number = 0;

  // 点击事件
  handleClick(event: void) {
    this.times++;
    this.$emit("click", event);
  }
}
</script>
