# xb-search-btn

默认点击无反应，如果需要点击事件，必须写@click

---

## 基础用法

<div class="demo-button">
  <div>
    <xb-search-btn></xb-search-btn>
  </div>
</div>

```html
<xb-search-btn></xb-search-btn>
```

## 修改默认值

<div class="demo-button">
  <div>
    <xb-search-btn placeholder="修改默认值"></xb-search-btn>
  </div>
</div>

```html
<xb-search-btn placeholder="修改默认值"></xb-search-btn>
```

## 自定义输入框大小

#### 外部传入的值

不允许修改 icon 的样式

<div class="demo-button">
  <div>
    <xb-search-btn :inputStyle="{'height':'50px','font-size':'20px','width':'400px'}"></xb-search-btn>
  </div>
</div>

```html
<xb-search-btn :inputStyle="{'height':'50px','font-size':'20px','width':'400px'}"></xb-search-btn>
```

#### 组件内自带的大小

<div class="demo-button">
  <div>
    <xb-search-btn size="large"></xb-search-btn>
    <br/>
     <xb-search-btn size="medium"></xb-search-btn>
     <br/>
       <xb-search-btn size="small"></xb-search-btn>
  </div>
</div>

```html
large

<xb-search-btn size="large"></xb-search-btn>

medium (不对大小进行处理的时候，采用的是 medium 尺寸的数据)

<xb-search-btn size="medium"></xb-search-btn>

small

<xb-search-btn size="small"></xb-search-btn>
```

## 隐藏搜索按钮（在内部显示）

<div class="demo-button">
  <div>
    <xb-search-btn :hidden="true"></xb-search-btn>
  </div>
</div>

```html
<xb-search-btn :hidden="true"></xb-search-btn>
```

## 获取搜索的值

@click 所调用的函数，不能加（），一定是直接写方法名称，否则传递的参数无效

<div class="demo-button">
  <div>
    <xb-search-btn  @click="clickFunc"></xb-search-btn>
  </div>
</div>
<script>
export default {
  methods: {
    clickFunc(value) {
      alert('输入框内的值是'+value)
    }
  }
}
</script>

```js
<xb-search-btn  @click="clickFunc"></xb-search-btn>

export default {
  methods: {
    clickFunc(value) {
      alert('输入框内的值是'+value)
    }
  }
}
```

## 参数表

| 参数名      | 参数说明             | 类型    | 可选值             | 默认值                        |
| :---------- | :------------------- | :------ | :----------------- | :---------------------------- |
| placeholder | 修改默认值           | string  | ——                 | 请输入...                     |
| inputStyle  | input 样式           | object  | ——                 | ——                            |
| size        | 搜索 input 框尺寸    | string  | large/medium/small | medium                        |
| hidden      | 搜索 icon 的显示样式 | boolean | false/true         | false                         |
| @click      | 点击事件             |         |                    | 点击后只会返回 input 的输入值 |
