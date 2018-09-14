<template>
  <div class="xb-card">
    <div class="xb-card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XbCard',
  props: {
    header: {},
    bodyStyle: {},
    shadow: {
      type: String,
    },
  },
};
</script>
