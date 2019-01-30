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

## 参数表

### Checkbox props

| 参数名        | 参数说明                                                            | 类型                      | 可选值                     | 默认值   |
| ------------- | ------------------------------------------------------------------- | ------------------------- | -------------------------- | -------- |
| value         | 只在单独使用时有效。可以使用 v-model 双向绑定数据                   | Boolean                   | ——                         | false    |
| label         | 只在组合使用时有效。指定当前选项的 value 值，组合会自动判断是否选中 | String , Number , Boolean | ——                         | -        |
| disabled      | 是否禁用当前项                                                      | Boolean                   | ——                         | false    |
| indeterminate | 设置 indeterminate 状态，只负责样式控制                             | Boolean                   | ——                         | false    |
| size          | 多选框的尺寸，可选值为 large、medium、small 或者不设置              | String                    | "small", "medium", "large" | "medium" |
| true-value    | 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用              | String, Number, Boolean   | ——                         | true     |
| false-value   | 没有选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用          | String, Number, Boolean   | ——                         | false    |

### Checkbox events

| 事件名    | 说明                                                                           | 返回值        |
| --------- | ------------------------------------------------------------------------------ | ------------- |
| on-change | 只在单独使用时有效。在选项状态发生改变时触发，通过修改外部的数据改变时不会触发 | true \| false |

### CheckboxGroup props

| 属性  | 说明                                                   | 类型   | 可选值                     | 默认值   |
| ----- | ------------------------------------------------------ | ------ | -------------------------- | -------- |
| value | 指定选中项目的集合，可以使用 v-model 双向绑定数据      | Array  | --                         | []       |
| size  | 多选框的尺寸，可选值为 large、medium、small 或者不设置 | String | "small", "medium", "large" | "medium" |

### CheckboxGroup events

| 事件名    | 说明                                                                         | 返回值 |
| --------- | ---------------------------------------------------------------------------- | ------ |
| on-change | 在选项状态发生改变时触发，返回已选中的数组。通过修改外部的数据改变时不会触发 | [...]  |

## 作者列表

| 作者 | 更新时间                    | 主要修改点 |
| :--- | :-------------------------- | :--------- |
| 少波 | 2019 年 1 月 30 日 13:14:00 | 搭建组件   |
