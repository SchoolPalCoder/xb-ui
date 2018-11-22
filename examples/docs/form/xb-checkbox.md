# xb-checkbox

---

# 概述

基本组件-多选框。主要用于一组可选项多项选择，或者单独用于标记切换某种状态。

# 示例

<template>
  <xb-checkbox v-model="checked">备选项</xb-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked: true
      };
    }
  };
</script>

```js
<template>
  <!-- `checked` 为 true 或 false -->
  <xb-checkbox v-model="checked">备选项</xb-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked: true
      };
    }
  };
</script>
```
