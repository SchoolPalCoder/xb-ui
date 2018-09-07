<template>
  <div class="el-card">
    <div class="el-card__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElCard',
  props: {
    header: {},
    bodyStyle: {},
    shadow: {
      type: String
    }
  }
};
</script>
