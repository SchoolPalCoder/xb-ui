<style>
  .xb-tag{
    margin-right: 10px;
  }
</style>

# xbTag 标签
----
### 基础用法
由`type`属性来选择tag的类型，也可以通过`color`属性来自定义背景色。


::: demo
```html

  <xb-tag>标签一</xb-tag>
  <xb-tag color="success">标签二</xb-tag>
  <xb-tag color="info">标签三</xb-tag>
  <xb-tag color="warning">标签四</xb-tag>
  <xb-tag color="danger">标签五</xb-tag>

```
:::



### 可移除标签
设置```closable```属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，它接受一个Boolean，true 为关闭。

::: demo
```html

```
:::

## API
<table class="table">
  <thead>
    <tr>
      <th width="25%">参数</th>
      <th width="25%">说明</th>
      <th width="25%">类型</th>
      <th width="25%">可选值</th>
      <th width="25%">默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>name</td>
      <td>用于触发关闭事件时的回调</td>
      <td>Boolean</td>
      <td>—</td>
      <td>false</td>
    </tr>
    <tr>
      <td>color</td>
      <td>类型</td>
      <td>String</td>
      <td>`primary`, `success`, `error`, `warning`, `info`</td>
      <td>primary</td>
    </tr>
    <tr>
      <td>closable</td>
      <td>是否可关闭</td>
      <td>Boolean</td>
      <td>—</td>
      <td>false</td>
    </tr>
  </tbody>
</table>

## xbTag 事件

<table class="table">
  <thead>
      <tr>
        <th width="33.333333339%">事件名称</th>
        <th width="33.333333339%">说明</th>
        <th width="33.333333339%">返回值</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>close</td>
        <td>点击关闭按钮时触发</td>
        <td>event</td>
      </tr>
    </tbody>
</table>
