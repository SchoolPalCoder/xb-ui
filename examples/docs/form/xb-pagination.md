# xb-pagination
----
# 概述



# 示例

## 基础用法
总页数小于等于7的效果
<template>
<div style="border: solid 1px #ebebeb;border-radius: 3px;margin:20px 0;">
  <xb-pagination :total="60" :current-page="6" v-on:page-change="pageChange">
  </xb-pagination>
</div>
</template>

```js
<xb-pagination :total="60" :current-page="6" v-on:page-change="pageChange"></xb-pagination>
```

总页数大于7的效果
<template>
<div style="border: solid 1px #ebebeb;border-radius: 3px;margin:20px 0;">
  <xb-pagination :total="100" :current-page="1" v-on:page-change="pageChange">
  </xb-pagination>
</div>
</template>

```js
<xb-pagination :total="100" :current-page="1" v-on:page-change="pageChange"></xb-pagination>
```

## 带有背景颜色的分页
<template>
<div style="border: solid 1px #ebebeb;border-radius: 3px;margin:20px 0;">
  <xb-pagination :total="100" :current-page="1" v-on:page-change="pageChange" :background="true">
  </xb-pagination>
</div>
</template>

```js
<xb-pagination :total="100" 
               :current-page="1" 
               :background="true"
               v-on:page-change="pageChange">
</xb-pagination>
```

## 带有页码跳转的分页
<template>
<div style="border: solid 1px #ebebeb;border-radius: 3px;margin:20px 0;">
  <xb-pagination :total="100" :current-page="1" v-on:page-change="pageChange" :showJumper="true">
  </xb-pagination>
</div>
</template>

```js
<xb-pagination :total="100" 
               :current-page="1" 
               :showJumper="true"
               v-on:page-change="pageChange">
</xb-pagination>
```
## 参数表

### xb-pagination props

| 参数名        | 参数说明                       | 类型                      | 可选值                     |默认值   |
| ------------- | ----------------------------  | -------------------------  | -------------------------- | -------- |
| pageSize      | 每页显示条目个数               | Number                   | ——                         | 10   |
| currentPage   | 当前页数                      | number                   | ——                         | 1        |
| pageSizes     | 每页显示个数选择器的选项设置    | number[]                 | ——                         | []    |
| total         | 总条目数                      | number                   | ——                         | 0    |
| showJumper    | 是否显示页码跳转框       | boolean                  | ——                         | false |
| showSizesSelect | 是否显示每页显示条数的下拉选择框 | boolean          | ——                         | false     |
| background   | 是否显示背景颜色                 | boolean            | ——                         | false    |

### xb-pagination events

| 事件名    | 说明                                                                           | 返回值        |
| --------- | ------------------------------------------------------------------------------ | ------------- |
| page-change | 页面的页码或者每页显示条目个数发生改变时触发       | { "0": currentPage, "1": pageSize } |

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
