# xb-button 按钮

常用的操作按钮。

## 基础用法

基础的按钮用法。

<div class="demo-button">
  <div>
    <xb-button type="default">默认按钮</xb-button>
    <xb-button type="reset">重置按钮</xb-button>
    <xb-button type="error">错误按钮</xb-button>
    <xb-button type="text">文字按钮</xb-button>
  </div>
</div>

```js
<xb-button type="default">默认按钮</xb-button>
<xb-button type="reset">重置按钮</xb-button>
<xb-button type="error">错误按钮</xb-button>
<xb-button type="text">文字按钮</xb-button>
```

## 禁用

禁用的按钮用法。

<div class="demo-button">
  <div>
    <xb-button type="default" disabled>默认按钮</xb-button>
    <xb-button type="reset" disabled>默认按钮</xb-button>
    <xb-button type="error" disabled>默认按钮</xb-button>
    <xb-button type="text" disabled>默认按钮</xb-button>
  </div>
</div>

```js
<xb-button type="default" disabled>默认按钮</xb-button>
<xb-button type="reset" disabled>默认按钮</xb-button>
<xb-button type="error" disabled>默认按钮</xb-button>
<xb-button type="text" disabled>默认按钮</xb-button>

export default {
  data() {
    return {
      disabled: true,
    };
  },
};
```

## 按钮大小

按钮大小设置

<xb-button type="default" size="large">很大而且很长会超出的按钮</xb-button>
<xb-button type="default">正常按钮</xb-button>
<xb-button type="default" size="small">小按钮</xb-button>

<div style="width:100%"><xb-button type="default" long>长度100%按钮</xb-button></div>

```js
<xb-button type="default" size="large">很大而且很长会超出的按钮</xb-button>
<xb-button type="default">正常按钮</xb-button>
<xb-button type="default" size="small">小按钮</xb-button>
```

## 事件调用

点击按钮的事件调用

<div class="demo-button">
  <div>
    <xb-button @click="clickFunc()" >click</xb-button>
  </div>
</div>

```js
<xb-button @click="clickFunc()">click</xb-button>

export default {
  methods: {
    clickFunc(evt) {
      alert("click")
    }
  }
}
```

<script>
export default {
  data(){
    return{
      disabled:true
    }
  },
  methods: {
    clickFunc(evt) {
      alert("click")
    }
  }
}
</script>

## 参数表

| 参数名   | 参数说明   | 类型   | 可选值   | 默认值   |
| :------- | :--------- | :----- | -------- | :------- |
| 参数名 1 | 参数说明 1 | 类型 1 | 可选值 1 | 默认值 1 |
| 参数名 2 | 参数说明 2 | 类型 2 | 可选值 2 | 默认值 2 |
