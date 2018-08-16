<template>
  <div>
    <xb-button :text="text"></xb-button>
  </div>
</template>

<script>
import XbButton from './button/index'
export default {
  components: {
    XbButton
  },
  data() {
    return {
      text: 'click me'
    }
  }
};
</script>

<style scoped>

</style>

