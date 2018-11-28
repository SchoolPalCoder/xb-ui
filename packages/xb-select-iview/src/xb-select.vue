<template>
  <div
    :class="classes"
    v-click-outside.capture="onClickOutside"
    v-click-outside:mousedown.capture="onClickOutside"
  >
    <div
      ref="reference"
      :class="selectionCls"
      :tabindex="selectTabindex"
      @blur="toggleHeaderFocus"
      @focus="toggleHeaderFocus"
      @click="toggleMenu"
      @keydown.esc="handleKeydown"
      @keydown.enter="handleKeydown"
      @keydown.up.prevent="handleKeydown"
      @keydown.down.prevent="handleKeydown"
      @keydown.tab="handleKeydown"
      @keydown.delete="handleKeydown"
      @mouseenter="hasMouseHoverHead = true"
      @mouseleave="hasMouseHoverHead = false"
    >
      <slot name="input">
        <input type="hidden" :name="name" :value="publicValue">
        <select-head
          :filterable="filterable"
          :multiple="multiple"
          :values="values"
          :clearable="canBeCleared"
          :disabled="disabled"
          :remote="remote"
          :input-element-id="elementId"
          :initial-label="initialLabel"
          :placeholder="placeholder"
          :query-prop="query"
          @on-query-change="onQueryChange"
          @on-input-focus="isFocused = true"
          @on-input-blur="isFocused = false"
          @on-clear="clearSingleSelect"
        />
      </slot>
    </div>
    <transition name="transition-drop">
      <Drop
        :class="dropdownCls"
        v-show="dropVisible"
        :placement="placement"
        ref="dropdown"
        :data-transfer="transfer"
        v-transfer-dom
      >
        <ul v-show="showNotFoundLabel" :class="[prefixCls + '-not-found']">
          <li>{{ localeNotFoundText }}</li>
        </ul>
        <ul :class="prefixCls + '-dropdown-list'">
          <functional-options
            v-if="(!remote) || (remote && !loading)"
            :options="selectOptions"
            :slot-update-hook="updateSlotOptions"
            :slot-options="slotOptions"
          ></functional-options>
        </ul>
        <ul v-show="loading" :class="[prefixCls + '-loading']">{{ localeLoadingText }}</ul>
      </Drop>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Mixins, Watch } from "vue-property-decorator";

import Icon from "../../xb-icon";
import Drop from "./dropdown.vue";
import vClickOutside from "v-click-outside-x";
import TransferDom from "src/directives/transfer-dom";
import { oneOf } from "src/utils/assist";
import Emitter from "src/mixins/emitter";
import Locale from "src/mixins/locale";
import SelectHead from "./select-head.vue";
import FunctionalOptions from "./functional-options.vue";

const prefixCls = "ivu-select";
const optionRegexp = /^i-option$|^Option$/;
const optionGroupRegexp = /option-?group/i;

const findChild = (instance, checkFn) => {
  let match = checkFn(instance);
  if (match) return instance;
  for (let i = 0, l = instance.$children.length; i < l; i++) {
    const child = instance.$children[i];
    match = findChild(child, checkFn);
    if (match) return match;
  }
};

const findOptionsInVNode = (node) => {
  const opts = node.componentOptions;
  if (opts && opts.tag.match(optionRegexp)) return [node];
  if (!node.children && (!opts || !opts.children)) return [];
  const children = [...(node.children || []), ...((opts && opts.children) || [])];
  const options = children.reduce((arr, el) => [...arr, ...findOptionsInVNode(el)], []).filter(Boolean);
  return options.length > 0 ? options : [];
};

const extractOptions = (options) =>
  options.reduce((options, slotEntry) => {
    return options.concat(findOptionsInVNode(slotEntry));
  }, []);

const applyProp = (node, propName, value) => {
  return {
    ...node,
    componentOptions: {
      ...node.componentOptions,
      propsData: {
        ...node.componentOptions.propsData,
        [propName]: value,
      },
    },
  };
};

const ANIMATION_TIMEOUT = 300;

@Component({
  name: "xbSelect",
  mixins: [Emitter, Locale],
  components: { FunctionalOptions, Drop, Icon, SelectHead },
  directives: { clickOutside: vClickOutside.directive, TransferDom },
})
export default class xbSelect extends Mixins(Emitter, Locale) {
  @Prop({ type: [String, Number, Array], default: "" })
  value!: string | number | any[];

  @Prop({ type: [String, Number, Array], default: "" })
  label!: string | number | any[];

  @Prop({ type: [Boolean], default: false })
  multiple!: boolean;

  @Prop({ type: [Boolean], default: false })
  disabled!: boolean;

  @Prop({ type: [Boolean], default: false })
  clearable!: boolean;

  @Prop({ type: [String] })
  placeholder!: string;

  @Prop({ type: [Boolean], default: false })
  filterable!: boolean;
  //TODO:function
  @Prop({ type: [Function] })
  filterMethod!: Function;

  @Prop({ type: [Function] })
  remoteMethod!: Function;

  @Prop({ type: [Boolean], default: false })
  loading!: boolean;

  @Prop({ type: [String], default: false })
  loadingText!: string;

  @Prop({
    type: [String],
    validator(value) {
      return oneOf(value, ["small", "large", "default"]);
    },
  })
  size!: string;
  //   size: {
  //     validator (value) {
  //         return oneOf(value, ['small', 'large', 'default']);
  //     }
  // },
  @Prop({ type: [Boolean], default: false })
  labelInValue!: boolean;

  @Prop({ type: [String] })
  notFoundText!: string;
  @Prop({
    type: [String],
    validator(value) {
      return oneOf(value, ["top", "bottom"]);
    },
    default: "bottom",
  })
  placement!: string;

  //   placement: {
  //     validator (value) {
  //         return oneOf(value, ['top', 'bottom']);
  //     },
  //     default: 'bottom'
  // },
  @Prop({ type: [Boolean], default: false })
  transfer!: boolean;

  @Prop({ type: [Boolean], default: false })
  autoComplete!: boolean;

  @Prop({ type: [String] })
  name!: string;

  @Prop({ type: [String] })
  elementId!: string;

  prefixCls: string = prefixCls;
  values: any[] = this.getInitialValue();
  dropDownWidth: number = 0;
  visible: boolean = false;
  focusIndex: number = -1;
  isFocused: boolean = false;
  query: string = "";
  initialLabel: string | number | any[] = this.label;
  hasMouseHoverHead: boolean = false;
  slotOptions: any = this.$slots.default;
  caretPosition: number = -1;
  lastRemoteQuery: string = "";
  unchangedQuery: boolean = true;
  hasExpectedValue: boolean = false;
  preventRemoteCall: boolean = false;

  mounted() {
    this.$on("on-select-selected", this.onOptionClick);

    // set the initial values if there are any
    if (this.values.length > 0 && !this.remote && this.selectOptions.length > 0) {
      this.values = this.values.map(this.getOptionData).filter(Boolean);
    }

    if (this.values.length > 0 && this.selectOptions.length === 0) {
      this.hasExpectedValue = this.values;
    }
  }
  get classes() {
    return [
      `${prefixCls}`,
      {
        [`${prefixCls}-visible`]: this.visible,
        [`${prefixCls}-disabled`]: this.disabled,
        [`${prefixCls}-multiple`]: this.multiple,
        [`${prefixCls}-single`]: !this.multiple,
        [`${prefixCls}-show-clear`]: this.showCloseIcon,
        [`${prefixCls}-${this.size}`]: !!this.size,
      },
    ];
  }
  get dropdownCls() {
    return {
      [prefixCls + "-dropdown-transfer"]: this.transfer,
      [prefixCls + "-multiple"]: this.multiple && this.transfer,
      ["ivu-auto-complete"]: this.autoComplete,
    };
  }
  get selectionCls() {
    return {
      [`${prefixCls}-selection`]: !this.autoComplete,
      [`${prefixCls}-selection-focused`]: this.isFocused,
    };
  }
  get queryStringMatchesSelectedOption() {
    const selectedOptions = this.values[0];
    if (!selectedOptions) return false;
    const [query, label] = [this.query, selectedOptions.label].map((str) => (str || "").trim());
    return !this.multiple && this.unchangedQuery && query === label;
  }
  get localeNotFoundText() {
    if (typeof this.notFoundText === "undefined") {
      return this.t("i.select.noMatch");
    } else {
      return this.notFoundText;
    }
  }
  get localeLoadingText() {
    if (typeof this.loadingText === "undefined") {
      return this.t("i.select.loading");
    } else {
      return this.loadingText;
    }
  }
  get transitionName() {
    return this.placement === "bottom" ? "slide-up" : "slide-down";
  }
  get dropVisible() {
    let status = true;
    const noOptions = !this.selectOptions || this.selectOptions.length === 0;
    if (!this.loading && this.remote && this.query === "" && noOptions) status = false;

    if (this.autoComplete && noOptions) status = false;

    return this.visible && status;
  }
  get showNotFoundLabel() {
    const { loading, remote, selectOptions } = this;
    return selectOptions && selectOptions.length === 0 && (!remote || (remote && !loading));
  }
  get publicValue() {
    if (this.labelInValue) {
      return this.multiple ? this.values : this.values[0];
    } else {
      return this.multiple ? this.values.map((option) => option.value) : (this.values[0] || {}).value;
    }
  }
  get canBeCleared() {
    const uiStateMatch = this.hasMouseHoverHead || this.active;
    const qualifiesForClear = !this.multiple && this.clearable;
    return uiStateMatch && qualifiesForClear && this.reset; // we return a function
  }
  get selectOptions() {
    const selectOptions = [];
    const slotOptions = this.slotOptions || [];
    let optionCounter = -1;
    const currentIndex = this.focusIndex;
    const selectedValues = this.values.filter(Boolean).map(({ value }) => value);
    if (this.autoComplete) {
      const copyChildren = (node, fn) => {
        return {
          ...node,
          children: (node.children || []).map(fn).map((child) => copyChildren(child, fn)),
        };
      };
      const autoCompleteOptions = extractOptions(slotOptions);
      const selectedSlotOption = autoCompleteOptions[currentIndex];

      return slotOptions.map((node) => {
        if (node === selectedSlotOption) return applyProp(node, "isFocused", true);
        return copyChildren(node, (child) => {
          if (child !== selectedSlotOption) return child;
          return applyProp(child, "isFocused", true);
        });
      });
    }

    for (let option of slotOptions) {
      const cOptions = option.componentOptions;
      if (!cOptions) continue;
      if (cOptions.tag.match(optionGroupRegexp)) {
        let children = cOptions.children;

        // remove filtered children
        if (this.filterable) {
          children = children.filter(({ componentOptions }) => this.validateOption(componentOptions));
        }

        cOptions.children = children.map((opt) => {
          optionCounter = optionCounter + 1;
          return this.processOption(opt, selectedValues, optionCounter === currentIndex);
        });

        // keep the group if it still has children
        if (cOptions.children.length > 0) selectOptions.push({ ...option });
      } else {
        // ignore option if not passing filter
        const optionPassesFilter = this.filterable ? this.validateOption(cOptions) : option;
        if (!optionPassesFilter) continue;

        optionCounter = optionCounter + 1;
        selectOptions.push(this.processOption(option, selectedValues, optionCounter === currentIndex));
      }
    }

    return selectOptions;
  }
  get flatOptions() {
    return extractOptions(this.selectOptions);
  }
  get selectTabindex() {
    return this.disabled || this.filterable ? -1 : 0;
  }
  get remote() {
    return typeof this.remoteMethod === "function";
  }

  setQuery(query) {
    // PUBLIC API
    if (query) {
      this.onQueryChange(query);
      return;
    }
    if (query === null) {
      this.onQueryChange("");
      this.values = [];
    }
  }
  clearSingleSelect() {
    // PUBLIC API
    this.$emit("on-clear");
    this.hideMenu();
    if (this.clearable) this.values = [];
  }
  getOptionData(value) {
    const option = this.flatOptions.find(({ componentOptions }) => componentOptions.propsData.value === value);
    if (!option) return null;
    const textContent = option.componentOptions.children.reduce((str, child) => str + (child.text || ""), "");
    const label = option.componentOptions.propsData.label || textContent || "";
    return {
      value: value,
      label: label,
    };
  }
  getInitialValue() {
    const { multiple, value } = this;
    let initialValue = Array.isArray(value) ? value : [value];
    if (!multiple && (typeof initialValue[0] === "undefined" || String(initialValue[0]).trim() === ""))
      initialValue = [];
    return initialValue.filter(Boolean);
  }
  processOption(option, values, isFocused) {
    if (!option.componentOptions) return option;
    const optionValue = option.componentOptions.propsData.value;
    const disabled = option.componentOptions.propsData.disabled;
    const isSelected = values.includes(optionValue);

    const propsData = {
      ...option.componentOptions.propsData,
      selected: isSelected,
      isFocused: isFocused,
      disabled: typeof disabled === "undefined" ? false : disabled !== false,
    };

    return {
      ...option,
      componentOptions: {
        ...option.componentOptions,
        propsData: propsData,
      },
    };
  }

  validateOption({ children, elm, propsData }) {
    if (this.queryStringMatchesSelectedOption) return true;

    const value = propsData.value;
    const label = propsData.label || "";
    const textContent =
      (elm && elm.textContent) ||
      (children || []).reduce((str, node) => {
        const nodeText = node.elm ? node.elm.textContent : node.text;
        return `${str} ${nodeText}`;
      }, "") ||
      "";
    const stringValues = JSON.stringify([value, label, textContent]);
    const query = this.query.toLowerCase().trim();
    return stringValues.toLowerCase().includes(query);
  }

  toggleMenu(e, force) {
    if (this.disabled || this.autoComplete) {
      return false;
    }

    this.visible = typeof force !== "undefined" ? force : !this.visible;
    if (this.visible) {
      this.dropDownWidth = this.$el.getBoundingClientRect().width;
      this.broadcast("Drop", "on-update-popper");
    }
  }
  hideMenu() {
    this.toggleMenu(null, false);
    setTimeout(() => (this.unchangedQuery = true), ANIMATION_TIMEOUT);
  }
  onClickOutside(event) {
    if (this.visible) {
      if (event.type === "mousedown") {
        event.preventDefault();
        return;
      }

      if (this.filterable) {
        const input = this.$el.querySelector('input[type="text"]');
        this.caretPosition = input.selectionStart;
        this.$nextTick(() => {
          const caretPosition = this.caretPosition === -1 ? input.value.length : this.caretPosition;
          input.setSelectionRange(caretPosition, caretPosition);
        });
      }

      if (!this.autoComplete) event.stopPropagation();
      event.preventDefault();
      this.hideMenu();
      this.isFocused = true;
    } else {
      this.caretPosition = -1;
      this.isFocused = false;
    }
  }
  reset() {
    this.unchangedQuery = true;
    this.values = [];
  }
  handleKeydown(e) {
    if (e.key === "Backspace") {
      return; // so we don't call preventDefault
    }

    if (this.visible) {
      e.preventDefault();
      if (e.key === "Tab") {
        e.stopPropagation();
      }

      // Esc slide-up
      if (e.key === "Escape") {
        e.stopPropagation();
        this.hideMenu();
      }
      // next
      if (e.key === "ArrowUp") {
        this.navigateOptions(-1);
      }
      // prev
      if (e.key === "ArrowDown") {
        this.navigateOptions(1);
      }
      // enter
      if (e.key === "Enter") {
        if (this.focusIndex === -1) return this.hideMenu();
        const optionComponent = this.flatOptions[this.focusIndex];
        const option = this.getOptionData(optionComponent.componentOptions.propsData.value);
        this.onOptionClick(option);
      }
    } else {
      const keysThatCanOpenSelect = ["ArrowUp", "ArrowDown"];
      if (keysThatCanOpenSelect.includes(e.key)) this.toggleMenu(null, true);
    }
  }
  navigateOptions(direction) {
    const optionsLength = this.flatOptions.length - 1;

    let index = this.focusIndex + direction;
    if (index < 0) index = optionsLength;
    if (index > optionsLength) index = 0;

    // find nearest option in case of disabled options in between
    if (direction > 0) {
      let nearestActiveOption = -1;
      for (let i = 0; i < this.flatOptions.length; i++) {
        const optionIsActive = !this.flatOptions[i].componentOptions.propsData.disabled;
        if (optionIsActive) nearestActiveOption = i;
        if (nearestActiveOption >= index) break;
      }
      index = nearestActiveOption;
    } else {
      let nearestActiveOption = this.flatOptions.length;
      for (let i = optionsLength; i >= 0; i--) {
        const optionIsActive = !this.flatOptions[i].componentOptions.propsData.disabled;
        if (optionIsActive) nearestActiveOption = i;
        if (nearestActiveOption <= index) break;
      }
      index = nearestActiveOption;
    }

    this.focusIndex = index;
  }
  onOptionClick(option) {
    if (this.multiple) {
      // keep the query for remote select
      if (this.remote) this.lastRemoteQuery = this.lastRemoteQuery || this.query;
      else this.lastRemoteQuery = "";

      const valueIsSelected = this.values.find(({ value }) => value === option.value);
      if (valueIsSelected) {
        this.values = this.values.filter(({ value }) => value !== option.value);
      } else {
        this.values = this.values.concat(option);
      }

      this.isFocused = true; // so we put back focus after clicking with mouse on option elements
    } else {
      this.query = String(option.label).trim();
      this.values = [option];
      this.lastRemoteQuery = "";
      this.hideMenu();
    }

    this.focusIndex = this.flatOptions.findIndex((opt) => {
      if (!opt || !opt.componentOptions) return false;
      return opt.componentOptions.propsData.value === option.value;
    });

    if (this.filterable) {
      const inputField = this.$el.querySelector('input[type="text"]');
      if (!this.autoComplete) this.$nextTick(() => inputField.focus());
    }
    this.broadcast("Drop", "on-update-popper");
  }
  onQueryChange(query) {
    if (query.length > 0 && query !== this.query) this.visible = true;
    this.query = query;
    this.unchangedQuery = this.visible;
  }
  toggleHeaderFocus({ type }) {
    if (this.disabled) {
      return;
    }
    this.isFocused = type === "focus";
  }
  updateSlotOptions() {
    this.slotOptions = this.$slots.default;
  }
  @Watch("value")
  onValueChanged(value) {
    const { getInitialValue, getOptionData, publicValue } = this;

    if (value === "") this.values = [];
    else if (JSON.stringify(value) !== JSON.stringify(publicValue)) {
      this.$nextTick(
        () =>
          (this.values = getInitialValue()
            .map(getOptionData)
            .filter(Boolean))
      );
    }
  }
  @Watch("values")
  onValuesChanged(now, before) {
    const newValue = JSON.stringify(now);
    const oldValue = JSON.stringify(before);
    const shouldEmitInput = newValue !== oldValue;

    if (shouldEmitInput) {
      // v-model is always just the value, event with labelInValue === true
      const vModelValue = this.labelInValue
        ? this.multiple
          ? this.publicValue.map(({ value }) => value)
          : this.publicValue.value
        : this.publicValue;
      this.$emit("input", vModelValue); // to update v-model
      this.$emit("on-change", this.publicValue);
      this.dispatch("FormItem", "on-form-change", this.publicValue);
    }
  }

  @Watch("query")
  onQueryChanged(query) {
    this.$emit("on-query-change", query);
    const { remoteMethod, lastRemoteQuery } = this;
    const hasValidQuery = query !== "" && (query !== lastRemoteQuery || !lastRemoteQuery);
    const shouldCallRemoteMethod = remoteMethod && hasValidQuery && !this.preventRemoteCall;
    this.preventRemoteCall = false; // remove the flag

    if (shouldCallRemoteMethod) {
      this.focusIndex = -1;
      const promise = this.remoteMethod(query);
      this.initialLabel = "";
      if (promise && promise.then) {
        promise.then((options) => {
          if (options) this.options = options;
        });
      }
    }
    if (query !== "" && this.remote) this.lastRemoteQuery = query;
  }
  @Watch("loading")
  onLoadingChanged(state) {
    if (state === false) {
      this.updateSlotOptions();
    }
  }
  @Watch("isFocused")
  onIsFocusedChanged(focused) {
    const el = this.filterable ? this.$el.querySelector('input[type="text"]') : this.$el;
    el[this.isFocused ? "focus" : "blur"]();

    // restore query value in filterable single selects
    const [selectedOption] = this.values;
    if (selectedOption && this.filterable && !this.multiple && !focused) {
      const selectedLabel = String(selectedOption.label || selectedOption.value).trim();
      if (selectedLabel && this.query !== selectedLabel) {
        this.preventRemoteCall = true;
        this.query = selectedLabel;
      }
    }
  }
  @Watch("focusIndex")
  onFocusIndexChanged(index) {
    if (index < 0 || this.autoComplete) return;
    // update scroll
    const optionValue = this.flatOptions[index].componentOptions.propsData.value;
    const optionInstance = findChild(this, ({ $options }) => {
      return $options.componentName === "select-item" && $options.propsData.value === optionValue;
    });

    let bottomOverflowDistance =
      optionInstance.$el.getBoundingClientRect().bottom - this.$refs.dropdown.$el.getBoundingClientRect().bottom;
    let topOverflowDistance =
      optionInstance.$el.getBoundingClientRect().top - this.$refs.dropdown.$el.getBoundingClientRect().top;
    if (bottomOverflowDistance > 0) {
      this.$refs.dropdown.$el.scrollTop += bottomOverflowDistance;
    }
    if (topOverflowDistance < 0) {
      this.$refs.dropdown.$el.scrollTop += topOverflowDistance;
    }
  }
  @Watch("dropVisible")
  onDropVisibleChanged(open) {
    this.broadcast("Drop", open ? "on-update-popper" : "on-destroy-popper");
  }
  @Watch("selectOptions")
  onSelectOptionsChanged(open) {
    if (this.hasExpectedValue) {
      this.values = this.values.map(this.getOptionData).filter(Boolean);
      this.hasExpectedValue = false;
    }

    if (this.slotOptions && this.slotOptions.length === 0) {
      this.query = "";
    }
  }
  @Watch("visible")
  onVisibleChanged(state) {
    this.$emit("on-open-change", state);
  }
}
</script>
