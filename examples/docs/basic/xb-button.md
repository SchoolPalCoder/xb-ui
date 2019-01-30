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

## 图标按钮

图标按钮及按钮形状

<div class="demo-button">
  <div>
    <xb-button type="default" icon="search">搜索按钮</xb-button>
    <xb-button type="default" icon="edit">编辑按钮</xb-button>
  </div>
</div>

```js
<xb-button type="default" icon="search">搜索按钮</xb-button>
<xb-button type="default" icon="edit">编辑按钮</xb-button>
```

## 按钮大小

按钮大小设置

<xb-button type="default" size="large">很大而且很长长长长会超出的按钮</xb-button>
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
      this.$message.success({
        text:'你点了我一下',
        duration:'2000'
      });
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
      this.$message.success({
        text:'你点了我一下',
        duration:'2000'
      });
    }
  }
}
</script>

## API

Button props

| 参数名   | 参数说明                                              | 类型    | 默认值  |
| :------- | :---------------------------------------------------- | :------ | :------ |
| type     | 按钮类型，可选值为`default`、`reset`、`error`、`text` | String  | default |
| size     | 按钮大小,可选值为`large`、`medium`、`samll`           | String  | medium  |
| icon     | 设置按钮的图标类型                                    | String  | -       |
| disabled | 设置按钮为禁用状态                                    | Boolean | false   |
| long     | 开启后，按钮的长度为 100%                             | Boolean | false   |

## 作者列表

| 作者   | 更新时间                    | 主要修改点 |
| :----- | :-------------------------- | :--------- |
| 黄李杰 | 2019 年 1 月 30 日 13:14:00 | 搭建组件   |
