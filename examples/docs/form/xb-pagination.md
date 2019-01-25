# xb-pagination
----
# 概述



# 示例

## 基础用法
<template>
<div style="border:1px,">
  <xb-pagination :total="60" :current-page="6" v-on:page-change="pageChange">
  </xb-pagination>
</div>

<div style="border:1px,">
  <xb-pagination :total="100" :current-page="1" v-on:page-change="pageChange" :background="true">
  </xb-pagination>
</div>
</template>
<script>
module.exports = {
    data() {
      return {}
    },
    methods: {
      pageChange(value) {
        console.log(value)
      }
    }
  }
</script>
