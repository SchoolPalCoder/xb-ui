<template>
  <form :class="classes" :autocomplete="autocomplete"><slot></slot></form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, Watch } from "vue-property-decorator";

const prefixCls = 'xbui-form';

@Component({ name: 'XbForm' })
export default class XbForm extends Vue {
  @Prop(Object) model!: object
  @Prop(Object) rules!: object
  @Prop(Number) labelWidth!: number
  @Prop({
    type: String,
    validator(value) {
      return ['left', 'right', 'top'].includes(value)
    },
    default: 'right'
  }) labelPosition!: string
  @Prop({ type:Boolean, default: true }) inline!: boolean
  @Prop({ type: Boolean, default: true }) showMessage!: boolean
  @Prop({
    type: String,
    validator(value) {
      return ['on', 'off'].includes(value);
    },
    default: 'off'
  }) autocomplete: string = 'off'

  @Provide() form = this

  fields: any[] = []

  get classes() {
    return [
      `${prefixCls}`,
      `${prefixCls}-label-${this.labelPosition}`,
      {
        [`${prefixCls}-inline`]: this.inline
      }
    ]
  }

  created() {
    this.$on('on-form-item-add', field => {
      if(field) {
        this.fields.push(field);
      }
      return false;
    });
    this.$on('on-form-item-remove', field => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
      return false;
    });
  }

  resetFields() {
    this.fields.forEach(field => {
        field.resetFeild();
    });
  }

  validate(callback) {
    return new Promise(resolve => {
        let validates = this.fields.map(f => {
            return new Promise(res => {
                f.validate('', (err, f) => {
                    resolve(err);
                });
            });
        });
        Promise.all(validates).then(result => {
            let valid = result.every(x => !!x);
            resolve(valid);
            if (typeof callback === 'function') {
                callback(valid);
            }
        });
    });
  }

  validateField(prop, cb) {
    const field = this.fields.filter(field => field.prop === prop)[0];
    if (!field) { throw new Error('[xbUI warn]: must call validateField with valid prop string!'); }

    field.validate('', cb);
  }

  @Watch('rules')
  onRulesChanged(val) {
    this.validate(() => {});
  }

}
</script>
