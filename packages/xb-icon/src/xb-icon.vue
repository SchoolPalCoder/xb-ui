<template>
  <i :class="'xbui-icon-' + name">
  </i>
</template>

<script>
export default {
  name: 'XbIcon',

  props: {
    name: String,
  },
};
</script>
