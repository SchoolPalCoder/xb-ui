# xb-button 按钮

常用的操作按钮。

## 基础用法

基础的按钮用法。

<div class="demo-button">
  <div>
    <xb-button type="default">默认按钮</xb-button>
    <xb-button type="reset">重置按钮</xb-button>
  </div>
</div>

```js
<xb-button type="default">默认按钮</xb-button>
<xb-button type="reset">重置按钮</xb-button>
```

## 禁用

禁用的按钮用法。

<div class="demo-button">
  <div>
    <xb-button disabled="disabled" >默认按钮</xb-button>
  </div>
</div>

```js
<xb-button disabled="disabled">默认按钮</xb-button>;

export default {
  data() {
    return {
      disabled: true,
    };
  },
};
```

## 事件调用

点击按钮的事件调用

<div class="demo-button">
  <div>
    <xb-button @click="clickFunc()">click</xb-button>
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

[^_^]: update

  ## 参数表 1

  | 参数名   | 参数说明   | 类型   | 可选值   | 默认值   |
  | :------- | :--------- | :----- | -------- | :------- |
  | 参数名 1 | 参数说明 1 | 类型 1 | 可选值 1 | 默认值 1 |
  | 参数名 2 | 参数说明 2 | 类型 2 | 可选值 2 | 默认值 2 |

  ## 参数表 12222

  | 参数名   | 参数说明   | 类型   | 可选值   | 默认值   |
  | :------- | :--------- | :----- | -------- | :------- |
  | 参数名 1 | 参数说明 1 | 类型 1 | 可选值 1 | 默认值 1 |
  | 参数名 2 | 参数说明 2 | 类型 2 | 可选值 2 | 默认值 2 |

  ## 参数表 12222

  | 参数名   | 参数说明   | 类型   | 可选值   | 默认值   |
  | :------- | :--------- | :----- | -------- | :------- |
  | 参数名 1 | 参数说明 1 | 类型 1 | 可选值 1 | 默认值 1 |
  | 参数名 2 | 参数说明 2 | 类型 2 | 可选值 2 | 默认值 2 |

  ## 参数表 12222

  | 参数名   | 参数说明   | 类型   | 可选值   | 默认值   |
  | :------- | :--------- | :----- | -------- | :------- |
  | 参数名 1 | 参数说明 1 | 类型 1 | 可选值 1 | 默认值 1 |
  | 参数名 2 | 参数说明 2 | 类型 2 | 可选值 2 | 默认值 2 |
