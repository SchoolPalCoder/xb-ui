<template>
  <label :class="wrapClasses">
    <span :class="radioClasses">
      <span :class="innerClasses"></span>
      <input
        type="radio"
        :class="inputClasses"
        :disabled="disabled"
        :checked="currentValue"
        :name="groupName"
        @change="change"
        @focus="onFocus"
        @blur="onBlur"
      >
    </span>
    <slot>{{ label }}</slot>
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch } from "vue-property-decorator";
import { findComponentUpward } from "src/utils/assist";
import XbRadioGroup from "./xb-radio-group.vue";
import Emitter from "src/mixins/emitter";

const prefixCls = "xbui-radio";

@Component({ name: "XbRadio", mixins: [Emitter] })
export default class XbRadio extends Mixins(Emitter) {
  // value 和v-model绑定一起，通过这个值的存在来进行弹框的显示
  @Prop({ type: [String, Number, Boolean], default: false })
  value!: [string, number, boolean];

  // 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用
  @Prop({ type: [String, Number, Boolean], default: true })
  trueValue!: [string, number, boolean];

  // 没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用
  @Prop({ type: [String, Number, Boolean], default: false })
  falseValue!: [string, number, boolean];

  // 只在组合使用时有效。指定当前选项的 value 值，组合会自动判断当前选择的项目
  @Prop({ type: [String, Number] })
  label!: [string, number];

  // 是否禁用当前项
  @Prop({ type: Boolean, default: false })
  disabled!: boolean;

  // 是否带边框
  @Prop({ type: Boolean, default: false })
  border!: boolean;

  // 尺寸大小
  @Prop({
    type: String,
    default: "medium",
    validator(value) {
      return ["small", "medium", "large"].includes(value);
    },
  })
  size!: string;

  @Prop({ type: String, default: "" })
  name!: string;

  currentValue: any = this.value;
  group: boolean = false;
  groupName: string = this.name;
  parent!: XbRadioGroup;
  focusWrapper: boolean = false;
  focusInner: boolean = false;

  get wrapClasses() {
    return [
      `${prefixCls}-wrapper`,
      {
        [`${prefixCls}-group-item`]: this.group,
        [`${prefixCls}-wrapper-checked`]: this.currentValue,
        [`${prefixCls}-wrapper-disabled`]: this.disabled,
        [`${prefixCls}-${this.size}`]: !!this.size,
        [`${prefixCls}-focus`]: this.focusWrapper,
        [`${prefixCls}-border`]: this.border,
      },
    ];
  }

  get radioClasses() {
    return [
      `${prefixCls}`,
      {
        [`${prefixCls}-checked`]: this.currentValue,
        [`${prefixCls}-disabled`]: this.disabled,
      },
    ];
  }

  get innerClasses() {
    return [
      `${prefixCls}-inner`,
      {
        [`${prefixCls}-focus`]: this.focusInner,
      },
    ];
  }

  get inputClasses() {
    return `${prefixCls}-input`;
  }

  mounted() {
    this.parent = findComponentUpward(this, "XbRadioGroup") as XbRadioGroup;
    if (this.parent) {
      this.group = true;
      if (!(this.name && this.name !== this.parent.name)) {
        this.groupName = this.parent.name;
      }
    }
    if (this.group) {
      this.parent.updateValue();
    } else {
      this.updateValue();
    }
  }

  updateValue() {
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
      if (this.label !== undefined) {
        this.parent.change({
          value: this.label,
          checked: this.value,
        });
      }
    } else {
      this.$emit("on-change", value);
      this.dispatch("FormItem", "on-form-change", value);
    }
  }

  onBlur() {
    this.focusWrapper = false;
    this.focusInner = false;
  }

  onFocus() {
    if (this.group && this.parent.type === "button") {
      this.focusWrapper = true;
    } else {
      this.focusInner = true;
    }
  }

  @Watch("value")
  onValueChanged(val) {
    if (val === this.trueValue || val === this.falseValue) {
      this.updateValue();
    }
  }
}
</script>
