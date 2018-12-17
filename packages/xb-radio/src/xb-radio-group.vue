<template>
  <div :class="classes" :name="name">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch, Emit } from "vue-property-decorator";
import { findComponentsDownward } from "src/utils/assist";
import XbRadio from "./xb-radio.vue";
import Emitter from "src/mixins/emitter";

const prefixCls = "xbui-radio-group";
let seed = 0;
const now = Date.now();
const getUuid = () => `xbRadioGroup_${now}_${seed++}`;

@Component({ name: "XbRadioGroup" })
export default class XbRadioGroup extends Mixins(Emitter) {
  // 指定当前选中的项目数据。可以使用 v-model 双向绑定数据
  @Prop({ type: [String, Number], default: "" })
  value!: [string, number];

  // 尺寸大小
  @Prop({
    type: String,
    default: "medium",
    validator(value) {
      return ["small", "medium", "large"].includes(value);
    },
  })
  size!: string;

  // 可选值为 button 或不填，为 button 时使用按钮样式
  @Prop({
    type: String,
    validator(value) {
      return ["button"].includes(value);
    },
  })
  type!: string;

  // 是否垂直排列，按钮样式下无效
  @Prop({ type: Boolean, default: false })
  vertical!: boolean;

  @Prop({ type: String, default: getUuid })
  name!: string;

  currentValue: [string, number] = this.value;
  childrens: XbRadio[] = [];

  get classes() {
    return [
      `${prefixCls}`,
      {
        [`${prefixCls}-${this.size}`]: !!this.size,
        [`xbui-radio-${this.size}`]: !!this.size,
        [`${prefixCls}-${this.type}`]: !!this.type,
        [`${prefixCls}-vertical`]: this.vertical,
      },
    ];
  }

  mounted() {
    this.updateValue();
  }

  updateValue() {
    this.childrens = findComponentsDownward(this, "XbRadio") as XbRadio[];
    if (this.childrens) {
      this.childrens.forEach((child) => {
        child.currentValue = this.value === child.label;
        child.group = true;
      });
    }
  }

  change(data) {
    this.currentValue = data.value;
    this.updateValue();
    this.$emit("input", data.value);
    this.$emit("on-change", data.value);
    this.dispatch("FormItem", "on-form-change", data.value);
  }

  @Watch("value")
  onValueChange() {
    this.currentValue = this.value;
    this.updateValue();
  }
}
</script>
