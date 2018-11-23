<template>
  <span class="xbui-checkBox" :class="[currentValue?'xbui-checkbox_checked':'',disabled?'xbui-checkbox_disabled':'']" @click="handleClick(!currentValue)"><em></em><slot>{{label}}</slot></span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class XbCheckbox extends Vue {
  /** 文案 */
  @Prop()
  label!: [string, Number];

  /** 双向绑定的值，控制是否选中 */
  @Prop({ default: false })
  value!: [String, Number, Boolean];

  /** 禁用组件 */
  @Prop({ default: false })
  disabled!: Boolean;

  /** 在组件修改数据之前的事件 */
  @Prop()
  onBeforeChange!: Function;

  currentValue: any = this.value;

  handleClick(value: any) {
    if (this.disabled) {
      return false;
    }

    let result = this.onBeforeChange && this.onBeforeChange(value);
    if (result === false) {
      return;
    }
    if (result && result.then) {
      return result.then((x) => {
        if (x !== false) {
          this.currentValue = value;
          this.$emit("input", this.currentValue);
        }
      });
    }

    this.currentValue = value;
    this.$emit("input", this.currentValue);
  }
}
</script>
