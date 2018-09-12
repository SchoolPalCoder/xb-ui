<template>
  <button class="xb-button" :class="[
                  disabled?'xb-button-disabled':'',
                  type ? 'xb-button-' + type : '',
                ]" @click="handleClick" :disabled="disabled" :type="nativeType">
    <i :class="icon" v-if="icon"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
/**
 * @props (参数名1) (参数说明1) (类型1) (可选值1) (默认值1)
 * @props (参数名2) (参数说明2) (类型2) (可选值2) (默认值2)
 */
export default {
  name: 'XbButton',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    size: String,
    icon: {
      type: String,
      default: '',
    },
    nativeType: {
      type: String,
      default: 'button',
    },
    disabled: Boolean,
  },

  computed: {},

  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    },
  },
};
</script>
