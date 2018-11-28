<template>
  <div :class="classes">
      <label :class="[prefixCls + '-label']" :for="labelFor" :style="labelStyles" v-if="label || $slots.label"><slot name="label">{{ label }}</slot></label>
      <div :class="[prefixCls + '-content']" :style="contentStyles">
          <slot></slot>
          <transition name="fade">
              <div :class="[prefixCls + '-error-tip']" v-if="validateState === 'error' && showMessage && form.showMessage">{{ validateMessage }}</div>
          </transition>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Inject, Mixins, Vue, Watch } from 'vue-property-decorator';
import Emmiter from 'src/mixins/emmiter';
import AsyncValidator from 'async-validator';

const prefixCls = 'xbui-form-item';

function getPropByPath(obj, path) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  let keyArr = path.split('.');
  let i = 0;

  for (let len = keyArr.length; i < len - 1; ++i) {
    let key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      throw new Error('[iView warn]: please transfer a valid prop path to form item!');
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj[keyArr[i]],
  };
}

@Component({ name: 'XbFormItem', mixins: [Emmiter] })
export default class XbFormItem extends Mixins(Emmiter) {
  @Prop({ type: String, default: '' })
  label!: string;
  @Prop(Number)
  labelWidth!: number;
  @Prop(String)
  type!: string;
  @Prop({ type: Boolean, default: false })
  required!: boolean;
  @Prop({ type: [Object, Array] })
  rules!: [object, Array<any>];
  @Prop(String)
  error!: string;
  @Prop(Boolean)
  validateStatus!: boolean;
  @Prop({ type: Boolean, default: true })
  showMessage!: boolean;
  @Prop(String)
  labelFor!: string;

  @Inject() form!: any;

  prefixCls: string = prefixCls;
  isRequired: boolean = false;
  validateState: string = '';
  validateMessage: string = '';
  validateDisabled: boolean = false;
  validator: any = {};

  get classes() {
    return [
      `${prefixCls}`,
      {
        [`${prefixCls}-required`]: this.required || this.isRequired,
        [`${prefixCls}-error`]: this.validateState === 'error',
        [`${prefixCls}-validating`]: this.validateState === 'validating',
      },
    ];
  }

  get fieldValue() {
    const model = this.form.model;
    if (!model || !this.prop) {
      return;
    }

    let path = this.prop;
    if (path.indexOf(':') !== -1) {
      path = path.replace(/:/, '.');
    }

    return getPropByPath(model, path).v;
  }

  get labelStyles() {
    let style: any = {};
    const labelWidth = this.labelWidth === 0 || this.labelWidth ? this.labelWidth : this.form.labelWidth;

    if (labelWidth || labelWidth === 0) {
      style.width = `${labelWidth}px`;
    }
    return style;
  }

  get contentStyles() {
    let style: any = {};
    const labelWidth = this.labelWidth === 0 || this.labelWidth ? this.labelWidth : this.form.labelWidth;

    if (labelWidth || labelWidth === 0) {
      style.marginLeft = `${labelWidth}px`;
    }
    return style;
  }

  @Watch('error')
  onErrorChanged(val) {
    this.validateMessage = val;
    this.validateState = val === '' ? '' : 'error';
  }

  @Watch('validateStatus')
  onValidateStatusChanged(val) {
    this.validateState = val;
  }

  @Watch('rules')
  onRulesChanged(val) {
    this.setRules();
  }

  setRules() {
    let rules = this.getRules();
    if (rules.length && this.required) {
      return;
    } else if (rules.length) {
      rules.every((rule) => {
        this.isRequired = rule.required;
      });
    } else if (this.required) {
      this.isRequired = this.required;
    }
    this.$off('on-form-blur', this.onFieldBlur);
    this.$off('on-form-change', this.onFieldChange);
    this.$on('on-form-blur', this.onFieldBlur);
    this.$on('on-form-change', this.onFieldChange);
  }
  getRules() {
    let formRules = this.form.rules;
    const selfRules = this.rules;

    formRules = formRules ? formRules[this.prop] : [];

    return ([] as any).concat(selfRules || formRules || []);
  }
  getFilteredRule(trigger) {
    const rules = this.getRules();

    return rules.filter((rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
  }
  validate(trigger, callback = function(msg?: string) {}) {
    let rules = this.getFilteredRule(trigger);
    if (!rules || rules.length === 0) {
      if (!this.required) {
        callback();
        return true;
      } else {
        rules = [{ required: true }];
      }
    }

    this.validateState = 'validating';

    let descriptor = {};
    descriptor[this.prop] = rules;

    const validator = new AsyncValidator(descriptor);
    let model = {};

    model[this.prop] = this.fieldValue;

    validator.validate(model, { firstFields: true }, (errors) => {
      this.validateState = !errors ? 'success' : 'error';
      this.validateMessage = errors ? errors[0].message : '';

      callback(this.validateMessage);
    });
    this.validateDisabled = false;
  }
  resetField() {
    this.validateState = '';
    this.validateMessage = '';

    let model = this.form.model;
    let value = this.fieldValue;
    let path = this.prop;
    if (path.indexOf(':') !== -1) {
      path = path.replace(/:/, '.');
    }

    let prop = getPropByPath(model, path);
    if (Array.isArray(value)) {
      this.validateDisabled = true;
      prop.o[prop.k] = [].concat(this.initialValue);
    } else {
      this.validateDisabled = true;
      prop.o[prop.k] = this.initialValue;
    }
  }
  onFieldBlur() {
    this.validate('blur');
  }
  onFieldChange() {
    if (this.validateDisabled) {
      this.validateDisabled = false;
      return;
    }

    this.validate('change');
  }

  mounted() {
    if (this.prop) {
        this.dispatch('iForm', 'on-form-item-add', this);

        Object.defineProperty(this, 'initialValue', {
            value: this.fieldValue
        });

        this.setRules();
    }
  }
  beforeDestroy () {
      this.dispatch('iForm', 'on-form-item-remove', this);
  }
}
</script>
