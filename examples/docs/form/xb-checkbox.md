<script>
  module.exports= {
    data() {
      return {
        checked: true,
        checkOptiations: ['facebook', 'github']
      };
    },
    methods:{
      created(){
        console.log(this.checkOptiations)
      }
    }
  };
</script>

# xb-checkbox

---

# 概述

基本组件-多选框。主要用于一组可选项多项选择，或者单独用于标记切换某种状态。

# 示例

## 基础用法

<template>
  <xb-checkbox v-model="checked">备选项</xb-checkbox>
  {{checked}}
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
  <xb-checkbox v-model="checked">备选项</xb-checkbox>
</template>
<script>
  export default {
    data() {
      return {
        checked: true,
        checkOptiations: ['facebook', 'github']
      };
    }
  };
</script>
```

## 组合使用

<template>
  <xb-checkbox-group v-model="checkOptiations">
    <xb-checkbox label="checked"></xb-checkbox>
    <!-- <xb-checkbox label="checked1"></xb-checkbox>
    <xb-checkbox label="checked2"></xb-checkbox> -->
  </xb-checkbox-group>
</template>
<script>
  export default {
    data() {
      return {
        checkOptiations: ['facebook', 'github']
      };
    },
    methods:{
      created(){
        console.log(this.checkOptiations)
      }
    }
  };
</script>

```js
<template>
<xb-checkbox-group v-model="checkOptiations">
  <xb-checkbox label="checked"></xb-checkbox>
  <xb-checkbox label="checked1"></xb-checkbox>
  <xb-checkbox label="checked2"></xb-checkbox>
</xb-checkbox-group>
</template>
<script>
  export default {
    data() {
      return {
        checkOptiations: ['facebook', 'github']
      };
    }
  };
</script>
```
