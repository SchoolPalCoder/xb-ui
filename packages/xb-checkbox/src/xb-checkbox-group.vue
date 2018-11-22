<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch } from "vue-property-decorator";
import { findComponentsDownward } from "src/utils/utils";
import XbCheckbox from "./xb-checkbox.vue";

@Component({ name: "XbCheckboxGroup" })
export default class XbCheckboxGroup extends Vue {
  /** 选中的值 */
  @Prop({ default: [] })
  value!: any[];

  // 当前值
  private currentValue: any[] = this.value;

  // 当前组件实例所有子级组件集合
  private childrens: XbCheckbox[] = [];

  // change事件
  onChange(data) {
    this.currentValue = data;
    this.$emit("on-change", data);
  }

  // 外部value值改变事件
  @Watch("value")
  onValueChange() {
    this.updateModel(true);
  }

  // 更新子组件内的值
  updateModel(isUpdate: boolean) {
    this.childrens = findComponentsDownward(this, "XbCheckbox") as XbCheckbox[];

    if (this.childrens.length > 0) {
      const { value } = this;
      this.childrens.forEach((child) => {
        child.isGroup = true;
        child.model = value;

        if (isUpdate) {
          child.currentValue = value.includes(child.label);
        }
      });
    }
  }
}
</script>
