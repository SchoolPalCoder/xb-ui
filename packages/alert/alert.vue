<template>
  <div v-show="isShow" class="xb-alert" :class="type ? 'xb-alert-' + type : ''" :type="nativeType">
    <div>{{title}}</div>
    <span class="xb-alert-x" @click="close()">x</span>
  </div>
</template>

<script>
import xbButton from '../button/index';
export default {
  name: 'XbAlert',
  component: { xbButton },
  data() {
    return {
      isShow: true
    }
  },
  props: {
    type: {
      type: String,
      default: 'default',
    },
    nativeType: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    close() {
      this.isShow = false;
    }
  },
};
</script>
