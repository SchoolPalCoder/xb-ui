# xb-text 输入框

即：Input 输入框

## 基础用法

<div class="demo-button">
  <div>
<xb-text></xb-text>
</div>
</div>

```html
// 默认输入文案：请输入，input输入框宽：180px，input输入框高：40px，默认不带可输入icon

<xb-text></xb-text>
```

## 修改默认文案

<div class="demo-button">
  <div>
<xb-text placeHolder="修改默认值"></xb-text>
</div>
</div>

```html
<xb-text placeHolder="修改默认值"></xb-text>
```

## 最大输入字符串长度

<div class="demo-button">
  <div>
<xb-text maxlength="10"></xb-text>
</div>
</div>

```html
<xb-text maxlength="10"></xb-text>
```

## 数字最大值

有了最大值后，就只允许输入数字了

<div class="demo-button">
  <div>
<xb-text :maxNum="10000"></xb-text>
</div>
</div>

```html
<xb-text :maxNum="10000"></xb-text>
```

## 禁用

disabled 属性接受一个 Boolean，设置为 true 即可禁用整个组件

<div class="demo-button">
  <div>
    <xb-text disabled="true"></xb-text>
  </div>
</div>

```html
<xb-text disabled="true"></xb-text>
```

## 外部传入的样式

根据设计稿，自主定义组件样式

<div class="demo-button">
  <div>
    <xb-text :inputStyle="{'width':'200px','height':'60px','font-size':'20px'}"></xb-text>
  </div>
</div>

```html
// 只修改input输入框的尺寸

<xb-text :inputStyle="{'width':'200px','height':'60px','font-size':'20px'}"></xb-text>
```

## TODO-List

正则表达式的验证时间还没确定（输入时？离焦时？）

键盘控制光标所用到的属性，功能类似于 tabindex，虽然我觉得可以不写

可清除 icon（由于 xbIcon 暂未完成，所以相关的 icon 无法展示）

带 icon 的输入框（prefix-icon 首部 icon，suffix-icon 尾部 icon，自定义 icon）

额外提供 medium、small、mini 三种尺寸的数字输入框处理
