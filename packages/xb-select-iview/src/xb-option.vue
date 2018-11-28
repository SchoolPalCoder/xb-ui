<template>
  <li
    :class="classes"
    @click.stop="select"
    @touchend.stop="select"
    @mousedown.prevent
    @touchstart.prevent
  >
    <slot>{{ showLabel }}</slot>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import Emitter from "src/mixins/emitter";
import { findComponentUpward } from "src/utils/assist";
const prefixCls = "xbui-select-item";

@Component({ name: "xbOption", mixins: [Emitter] })
export default class xbOption extends Mixins(Emitter) {
  @Prop({ type: [String, Number], required: true })
  value!: string | number;

  @Prop({ type: [String, Number] })
  label!: string | number;
  /** 是否禁用 */
  @Prop({ type: Boolean, default: false })
  disabled!: boolean;
  /** 默认选中项 */
  @Prop({ type: Boolean, default: false })
  selected!: boolean;
  /** 暂时未启用 */
  @Prop({ type: Boolean, default: false })
  isFocused!: boolean;

  searchLabel: string = ""; // the slot value (textContent)
  autoComplete: boolean = false;
  mounted() {
    const Select = findComponentUpward(this, "iSelect");
    if (Select) this.autoComplete = Select.autoComplete;
  }
  select() {
    if (this.disabled) return false;

    this.dispatch("iSelect", "on-select-selected", {
      value: this.value,
      label: this.optionLabel,
    });
    this.$emit("on-select-selected", {
      value: this.value,
      label: this.optionLabel,
    });
  }

  get classes() {
    return [
      `${prefixCls}`,
      {
        [`${prefixCls}-disabled`]: this.disabled,
        [`${prefixCls}-selected`]: this.selected && !this.autoComplete,
        [`${prefixCls}-focus`]: this.isFocused,
      },
    ];
  }
  get showLabel() {
    return this.label ? this.label : this.value;
  }
  get optionLabel() {
    return (this.$el && this.$el.textContent) || this.label;
  }
}
</script>
