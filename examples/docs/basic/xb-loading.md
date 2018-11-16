# xb-loading

loading图标

## 基础用法

基础的加载图标用法。

<div class="demo-loading">
  <div style="position:relative;width:240px;height:100px">
    <xb-loading :load-show="true" :custom-class="'relative'">默认加载图标</xb-loading>
  </div>
</div>

```js

<xb-loading  :load-show="isShow" >默认加载图标</xb-loading>

export default {
  data() {
    return {
      isShow: false,
    };
  }
};
```

## 参数表 1

| 参数名   | 参数说明   | 类型   | 可选值   | 默认值   |
| :------- | :--------- | :----- | -------- | :------- |
| 参数名 1 | 参数说明 1 | 类型 1 | 可选值 1 | 默认值 1 |
| 参数名 2 | 参数说明 2 | 类型 2 | 可选值 2 | 默认值 2 |

