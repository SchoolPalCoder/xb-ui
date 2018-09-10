---
sidebarDepth: 1
---

# Button 按钮
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
<xb-button disabled="disabled" >默认按钮</xb-button>

export default {
  data(){
    return{
      disabled:true
    }
  }
}
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
