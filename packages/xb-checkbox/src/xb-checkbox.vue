<template>
  <label :class="wrapClasses">
    <span :class="checkboxClasses">
      <span :class="innerClasses"></span>
      <input
        v-if="group"
        type="checkbox"
        :class="inputClasses"
        :disabled="disabled"
        :value="label"
        v-model="model"
        :name="name"
        @change="change"
        @focus="onFocus"
        @blur="onBlur"
      >
      <input
        v-else
        type="checkbox"
        :class="inputClasses"
        :disabled="disabled"
        :checked="currentValue"
        :name="name"
        @change="change"
        @focus="onFocus"
        @blur="onBlur"
      >
    </span>
    <slot>
      <span v-if="showSlot">{{ label }}</span>
    </slot>
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch } from "vue-property-decorator";
import { findComponentUpward } from "src/utils/utils";
import XbCheckboxGroup from "./xb-checkbox-group.vue";
import Emmiter from "src/mixins/emmiter";

const prefixCls = "xbui-checkbox";

@Component({ name: "XbCheckBox", mixins: [Emmiter] })
export default class XbCheckbox extends Mixins(Emmiter) {
  /** 只在单独使用时有效。可以使用 v-model 双向绑定数据 */
  @Prop({ type: [String, Number, Boolean], default: false })
  value!: string | number | boolean;

  /** 只在组合使用时有效。指定当前选项的 value 值，组合会自动判断是否选中 */
  @Prop({ type: [String, Number, Boolean], default: "" })
  label!: string | number | boolean;

  /** 设置 indeterminate 状态，是否半选中状态，只负责样式控制 */
  @Prop({ type: Boolean, default: false })
  indeterminate!: boolean;

  /** 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用 */
  @Prop({ type: [String, Number, Boolean], default: true })
  trueValue!: string | number | boolean;

  /** 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用 */
  @Prop({ type: [String, Number, Boolean], default: false })
  falseValue!: string | number | boolean;

  /** 是否禁用 */
  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  /** 尺寸大小 */
  @Prop({
    type: String,
    default: "medium",
    validator(value) {
      return ["small", "medium", "large"].includes(value);
    },
  })
  size!: string;

  @Prop({ type: String })
  name!: string;

  // 是否是CheckboxGroup,值的改变由XbCheckboxGroup组件控制
  group: boolean = false;

  // 数据模型
  model: any[] = [];

  currentValue: string | number | boolean = this.value;

  showSlot: boolean = true;

  // 用于存放XbCheckboxGroup组件的Vue实例
  parent!: XbCheckboxGroup;

  focusInner: boolean = false;

  mounted() {
    this.parent = findComponentUpward(this, "XbCheckboxGroup") as XbCheckboxGroup;
    if (this.parent) {
      this.group = true;
    }

    if (this.group) {
      this.parent.updateModel(true);
    } else {
      this.updateModel();
      this.showSlot = this.$slots.default !== undefined;
    }
  }

  updateModel() {
    this.currentValue = this.value === this.trueValue;
  }

  change(event) {
    if (this.disabled) {
      return false;
    }

    const checked = event.target.checked;
    this.currentValue = checked;

    const value = checked ? this.trueValue : this.falseValue;
    this.$emit("input", value);

    if (this.group) {
      this.parent.change(this.model);
    } else {
      this.$emit("on-change", value);
      this.dispatch("FormItem", "on-form-change", value);
    }
  }

  onBlur() {
    this.focusInner = false;
  }

  onFocus() {
    this.focusInner = true;
  }

  @Watch("value")
  onValueChanged(val) {
    if (val === this.trueValue || val === this.falseValue) {
      this.updateModel();
    } else {
      throw new Error("Value should be trueValue or falseValue.");
    }
  }

  get wrapClasses() {
    return [
      `${prefixCls}-wrapper`,
      {
        [`${prefixCls}-group-item`]: this.group,
        [`${prefixCls}-wrapper-checked`]: this.currentValue,
        [`${prefixCls}-wrapper-disabled`]: this.disabled,
      },
    ];
  }
  get checkboxClasses() {
    return [
      `${prefixCls}`,
      {
        [`${prefixCls}-checked`]: this.currentValue,
        [`${prefixCls}-disabled`]: this.disabled,
        [`${prefixCls}-indeterminate`]: this.indeterminate,
      },
    ];
  }
  get innerClasses() {
    return [`${prefixCls}-inner`];
  }
  get inputClasses() {
    return `${prefixCls}-input`;
  }
}
</script>
