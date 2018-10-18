# xbButton 按钮

----
### 基础用法
使用```type```、```plain```和```round```属性来定义 Button 的样式。

<div>
  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="xbarning">警告按钮</el-button>
  <xb-button type="danger">危险按钮</xb-button>
</div>

::: demo 默认的

```html
<div>
  <xb-button>默认按钮</xb-button>
  <xb-button type="primary">主要按钮</xb-button>
  <xb-button type="success">成功按钮</xb-button>
  <xb-button type="info">信息按钮</xb-button>
  <xb-button type="xbarning">警告按钮</xb-button>
  <xb-button type="danger">危险按钮</xb-button>
</div>
<div>
  <xb-button plain>朴素按钮</xb-button>
  <xb-button type="primary" plain>主要按钮</xb-button>
  <xb-button type="success" plain>成功按钮</xb-button>
  <xb-button type="info" plain>信息按钮</xb-button>
  <xb-button type="xbarning" plain>警告按钮</xb-button>
  <xb-button type="danger" plain>危险按钮</xb-button>
</div>
<div>
  <xb-button round>圆形按钮</xb-button>
  <xb-button type="primary" round>主要按钮</xb-button>
  <xb-button type="success" round>成功按钮</xb-button>
  <xb-button type="info" round>信息按钮</xb-button>
  <xb-button type="xbarning" round>警告按钮</xb-button>
  <xb-button type="danger" round>危险按钮</xb-button>
</div>

```
:::

### 禁用状态

按钮不可用状态。


::: demo
```html

<div>
  <xb-button disabled>默认按钮</xb-button>
  <xb-button type="primary" disabled>主要按钮</xb-button>
  <xb-button type="success" disabled>成功按钮</xb-button>
  <xb-button type="info" disabled>信息按钮</xb-button>
  <xb-button type="xbarning" disabled>警告按钮</xb-button>
  <xb-button type="danger" disabled>危险按钮</xb-button>
</div>
<div class="m-10">
  <xb-button plain disabled>朴素按钮</xb-button>
  <xb-button type="primary" plain disabled>主要按钮</xb-button>
  <xb-button type="success" plain disabled>成功按钮</xb-button>
  <xb-button type="info" plain disabled>信息按钮</xb-button>
  <xb-button type="xbarning" plain disabled>警告按钮</xb-button>
  <xb-button type="danger" plain disabled>危险按钮</xb-button>
</div>

```
:::

### 图标按钮
带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。
设置```icon```属性即可，icon 的列表可以参考 xb-ui 的 icon 组件，也可以设置在文字右边的 icon ，只要使用```i```标签即可，可以使用自定义图标。

::: demo
```html

<xb-button icon="xb-icon-tag" type="primary"></xb-button>
<xb-button icon="xb-icon-close" type="primary"></xb-button>
<xb-button icon="xb-icon-smile" type="primary"></xb-button>
<xb-button icon="xb-icon-search" type="primary">搜索</xb-button>
<xb-button icon="xb-icon-cloudfill" type="primary">下载</xb-button>

```
:::


### 不同尺寸

xbButton 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。
额外的尺寸：```medium```、```small```，通过设置```size```属性来配置它们。

::: demo
```html

<xb-button>默认尺寸</xb-button>
<xb-button size="medium">中等按钮</xb-button>
<xb-button size="small">小型按钮</xb-button>

```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   default,medium,small            |    —     |
| type     | 类型   | string    |   primary,success,xbarning,danger,info |     —    |
| plain     | 是否朴素按钮   | Boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标，已有的图标库中的图标名 | string   |  —  |  —  |
