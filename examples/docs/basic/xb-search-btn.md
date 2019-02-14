<script>
  export default {
    data() {
      return {
        value1: '',
        value2: '',
        value3_1: '',
        value3_2: '',
        value3_3: '',
        value3_4: '',
        value4: '',
        value5: '',
      }
    },
    methods: {
      clickFunc(value) {
        alert('输入框内的值是'+value)
      }
    }
  }
</script>

# xb-search-btn

默认点击无反应，如果需要点击事件，必须写@click

---

## 基础用法

<div class="demo-button">
  <div>
    <xb-search-btn  v-model="value1"></xb-search-btn>
  </div>
</div>

```html
<xb-search-btn v-model="value1"></xb-search-btn>
```

## 修改默认值

<div class="demo-button">
  <div>
    <xb-search-btn v-model="value2" placeholder="修改默认值"></xb-search-btn>
  </div>
</div>

```html
<xb-search-btn v-model="value2" placeholder="修改默认值"></xb-search-btn>
```

## 自定义输入框大小

#### 外部传入的值

不允许修改 icon 的样式

<div class="demo-button">
  <div>
    <xb-search-btn v-model="value3_1" :inputStyle="{'height':'50px','font-size':'20px','width':'400px'}"></xb-search-btn>
  </div>
</div>

```html
<xb-search-btn v-model="value3_1" :inputStyle="{'height':'50px','font-size':'20px','width':'400px'}"></xb-search-btn>
```

#### 组件内自带的大小

<div class="demo-button">
  <div>
    <xb-search-btn v-model="value3_2" size="large"></xb-search-btn>
    <br/>
    <xb-search-btn v-model="value3_3" size="medium"></xb-search-btn>
    <br/>
    <xb-search-btn v-model="value3_4" size="small"></xb-search-btn>
  </div>
</div>

```html
<!-- large -->
<xb-search-btn v-model="value3_2" size="large"></xb-search-btn>

<!-- medium (不对大小进行处理的时候，采用的是 medium 尺寸的数据) -->
<xb-search-btn v-model="value3_3" size="medium"></xb-search-btn>

<!-- small -->
<xb-search-btn v-model="value3_4" size="small"></xb-search-btn>
```

## 隐藏搜索按钮（在内部显示）

<div class="demo-button">
  <div>
    <xb-search-btn v-model="value4" :hidden="true"></xb-search-btn>
  </div>
</div>

```html
<xb-search-btn v-model="value4" :hidden="true"></xb-search-btn>
```

## 获取搜索的值

<div class="demo-button">
  <div>
    <xb-search-btn v-model="value5"  @click="clickFunc"></xb-search-btn>
  </div>
</div>

```js
<xb-search-btn v-model="value5" @click="clickFunc"></xb-search-btn>

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

## 作者列表

| 作者 | 更新时间                    | 主要修改点 |
| :--- | :-------------------------- | :--------- |
| 黄莹 | 2019 年 1 月 30 日 13:14:00 | 搭建组件   |
