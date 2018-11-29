<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch, Emit } from "vue-property-decorator";
import { findComponentsDownward } from "src/utils/assist";
import XbCheckbox from "./xb-checkbox.vue";
import Emitter from "src/mixins/emitter";

const prefixCls = "xbui-checkbox";

@Component({ name: "XbCheckboxGroup" })
export default class XbCheckboxGroup extends Mixins(Emitter) {
  /** 选中的值 */
  @Prop({
    type: Array,
    default() {
      return [];
    },
  })
  value!: any[];

  /** 尺寸大小 */
  @Prop({
    type: String,
    default: "medium",
    validator(value) {
      return ["small", "medium", "large"].includes(value);
    },
  })
  size!: string;

  // 当前值
  private currentValue: any[] = this.value;

  // 当前组件实例所有子级组件集合
  private childrens: XbCheckbox[] = [];

  mounted() {
    this.updateModel(true);
  }

  // 外部value值改变事件
  @Watch("value")
  onValueChange() {
    this.updateModel(true);
  }

  // 更新子组件内的值
  updateModel(update) {
    this.childrens = findComponentsDownward(this, "Checkbox") as XbCheckbox[];
    if (this.childrens) {
      const { value } = this;
      this.childrens.forEach((child) => {
        child.model = value;

        if (update) {
          child.currentValue = value.indexOf(child.label) >= 0;
          child.group = true;
        }
      });
    }
  }

  change(data) {
    this.currentValue = data;
    this.$emit("input", data);
    this.$emit("on-change", data);
    this.dispatch("FormItem", "on-form-change", data);
  }

  get classes() {
    return [
      `${prefixCls}-group`,
      {
        [`${prefixCls}-${this.size}`]: !!this.size,
      },
    ];
  }
}
</script>
