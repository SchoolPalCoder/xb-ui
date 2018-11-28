<template>
  <div @click="onHeaderClick">
    <div class="ivu-tag ivu-tag-checked" v-for="item in selectedMultiple">
      <span class="ivu-tag-text">{{ item.label }}</span>
      <Icon type="ios-close-empty" @click.native.stop="removeTag(item)"></Icon>
    </div>
    <span :class="singleDisplayClasses" v-show="singleDisplayValue">{{ singleDisplayValue }}</span>
    <input
      :id="inputElementId"
      type="text"
      v-if="filterable"
      v-model="query"
      :disabled="disabled"
      :class="[prefixCls + '-input']"
      :placeholder="showPlaceholder ? localePlaceholder : ''"
      :style="inputStyle"
      autocomplete="off"
      spellcheck="false"
      @keydown="resetInputState"
      @keydown.delete="handleInputDelete"
      @focus="onInputFocus"
      @blur="onInputFocus"
      ref="input"
    >
    <Icon
      type="ios-close"
      :class="[prefixCls + '-arrow']"
      v-if="resetSelect"
      @click.native.stop="onClear"
    ></Icon>
    <Icon
      type="arrow-down-b"
      :class="[prefixCls + '-arrow']"
      v-if="!resetSelect && !remote && !disabled"
    ></Icon>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Mixins, Vue, Watch } from "vue-property-decorator";
import Icon from "../../xb-icon";
import Emitter from "src/mixins/emitter";
import Locale from "src/mixins/locale";

const prefixCls = "ivu-select";

@Component({ name: "xbSelectHead", mixins: [Emitter, Locale], components: { Icon } })
export default class xbSelectHead extends Mixins(Emitter, Locale) {
  @Prop({ type: [String, Number], required: true })
  value!: string | number;

  @Prop({ type: [Boolean], default: false })
  disabled!: boolean;

  @Prop({ type: [Boolean], default: false })
  filterable!: boolean;

  @Prop({ type: [Boolean], default: false })
  multiple!: boolean;

  @Prop({ type: [Boolean], default: false })
  remote!: boolean;

  @Prop({ type: Array, default: () => [] })
  values!: any[];

  @Prop({ type: [String] })
  initialLabel!: string;

  @Prop({ type: [String] })
  inputElementId!: string;

  @Prop({ type: [String] })
  placeholder!: string;

  @Prop({ type: [String], default: false })
  queryProp!: string;

  @Prop({ type: [Function, Boolean], default: false })
  clearable!: string | boolean;

  prefixCls: string = prefixCls;
  query: string = "";
  inputLength: number = 20;
  remoteInitialLabel: string = this.initialLabel;
  preventRemoteCall: boolean = false;

  get singleDisplayClasses() {
    const { filterable, multiple, showPlaceholder } = this;
    return [
      {
        [prefixCls + "-placeholder"]: showPlaceholder && !filterable,
        [prefixCls + "-selected-value"]: !showPlaceholder && !multiple && !filterable,
      },
    ];
  }
  get singleDisplayValue() {
    if ((this.multiple && this.values.length > 0) || this.filterable) return "";
    return `${this.selectedSingle}` || this.localePlaceholder;
  }
  get showPlaceholder() {
    let status = false;
    if (!this.multiple) {
      const value = this.values[0];
      if (typeof value === "undefined" || String(value).trim() === "") {
        status = !this.remoteInitialLabel;
      }
    } else {
      if (!this.values.length) {
        // if (!this.values.length > 0) {
        status = true;
      }
    }
    return status;
  }
  get resetSelect() {
    return !this.showPlaceholder && this.clearable;
  }
  get inputStyle() {
    let style = {};

    if (this.multiple) {
      if (this.showPlaceholder) {
        style.width = "100%";
      } else {
        style.width = `${this.inputLength}px`;
      }
    }

    return style;
  }
  get localePlaceholder() {
    if (this.placeholder === undefined) {
      return this.t("i.select.placeholder");
    } else {
      return this.placeholder;
    }
  }
  get selectedSingle() {
    const selected = this.values[0];
    return selected ? selected.label : this.remoteInitialLabel || "";
  }
  get selectedMultiple() {
    return this.multiple ? this.values : [];
  }

  onInputFocus(e) {
    this.$emit(e.type === "focus" ? "on-input-focus" : "on-input-blur");
  }
  removeTag(value) {
    if (this.disabled) return false;
    this.dispatch("iSelect", "on-select-selected", value);
  }
  resetInputState() {
    this.inputLength = this.$refs.input.value.length * 12 + 20;
  }
  handleInputDelete() {
    if (this.multiple && this.selectedMultiple.length && this.query === "") {
      this.removeTag(this.selectedMultiple[this.selectedMultiple.length - 1]);
    }
  }
  onHeaderClick(e) {
    if (this.filterable && e.target === this.$el) {
      this.$refs.input.focus();
    }
  }
  onClear() {
    this.$emit("on-clear");
  }
  @Watch("values")
  onValuesChanged([value]) {
    if (!this.filterable) return;
    this.preventRemoteCall = true;
    if (this.multiple) {
      this.query = "";
      this.preventRemoteCall = false; // this should be after the query change setter above
      return;
    }
    // #982
    if (typeof value === "undefined" || value === "" || value === null) this.query = "";
    else this.query = value.label;
    this.$nextTick(() => (this.preventRemoteCall = false)); // this should be after the query change setter above
  }
  @Watch("query")
  onQueryChanged(val) {
    if (this.preventRemoteCall) {
      this.preventRemoteCall = false;
      return;
    }

    this.$emit("on-query-change", val);
  }
  @Watch("queryProp")
  onQueryPropChanged(query) {
    if (query !== this.query) this.query = query;
  }
}
</script>


