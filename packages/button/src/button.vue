<template>
  <button class="" @click="handleClick" :disabled="disabled" :type="nativeType">
    <i :class="icon" v-if="icon"></i>
  </button>
</template>

<script>
export default {
  name: "XBButton",

  props: {
    type: {
      type: String,
      default: "default"
    },
    size: String,
    icon: {
      type: String,
      default: ""
    },
    nativeType: {
      type: String,
      default: "button"
    },
    disabled: Boolean
  },

  computed: {},

  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    }
  }
};
</script>

<style scoped>

</style>

