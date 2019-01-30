# xb-input-number 计数器

仅允许输入标准的数字值，可定义范围

## 基础用法

计数器的基础用法。

<div class="demo-button">
  <div>
    <xb-input-number></xb-input-number>
  </div>
</div>

```html
// 初始输入值：0，最小值：0，步进：1，只允许输入纯数字，input输入框宽：180px，input输入框高：40px，右侧按钮宽：40px

<xb-input-number></xb-input-number>
```

## 输入值

#### 初始值

<div class="demo-button" style="margin-top:10px;">
  <div>
    <xb-input-number :firstNum=20></xb-input-number>
  </div>
</div>

```html
// 初始值：20

<xb-input-number :firstNum="20"></xb-input-number>
```

#### 正则

<div class="demo-button" style="margin-top:10px;">
  <div>
    <xb-input-number regExp="^\d{1}$"></xb-input-number>
</div>
</div>

```html
// 只能存在 一位正数

<xb-input-number regExp="^\d{1}$"></xb-input-number>
```

#### 最大值

<div class="demo-button" style="margin-top:10px;">
  <div>
    <xb-input-number :max='10'></xb-input-number>
</div>
</div>

```html
// 最大值：10

<xb-input-number :max="10"></xb-input-number>
```

#### 最小值

<div class="demo-button" style="margin-top:10px;">
  <div>
    <xb-input-number :min='-5'></xb-input-number>
</div>
</div>

```html
// 最小值：-5

<xb-input-number :min="-5"></xb-input-number>
```

## 禁用

disabled 属性接受一个 Boolean，设置为 true 即可禁用整个组件，如果只需要控制数值在某一范围内，可以设置 min 和 max，min 默认为 0。

<div class="demo-button">
  <div>
    <xb-input-number disabled="true"></xb-input-number>
  </div>
</div>

```html
<xb-input-number disabled="true"></xb-input-number>
```

## 步进

设置 step 属性可以控制步长，只接受一个 Number。

<div class="demo-button">
  <div>
    <xb-input-number step='5'></xb-input-number>
  </div>
</div>

```html
// 每次改变值为5

<xb-input-number step="5"></xb-input-number>
```

## 外部传入的样式

根据设计稿，自主定义组件样式

<div class="demo-button">
  <div>
    <xb-input-number :inputStyle="{'width':'100px','height':'30px'}"></xb-input-number>
  </div>
</div>

```html
// 只修改input输入框的尺寸，最小高度为30px

<xb-input-number :inputStyle="{'width':'100px','height':'30px'}"></xb-input-number>
```

[^_^]: update

## 参数表

| 参数名     | 参数说明               | 类型    | 可选值 | 默认值           |
| :--------- | :--------------------- | :------ | :----- | :--------------- |
| firstNum   | 传入的初始化值         | number  | ——     | 1                |
| min        | 设置计数器允许的最小值 | number  | ——     | 0                |
| max        | 设置计数器允许的最大值 | number  | ——     | ——               |
| step       | 计数器步长             | number  | ——     | 1                |
| disabled   | 是否禁用计数器         | boolean | ——     | false            |
| inputStyle | 计数器尺寸             | object  | ——     | ——               |
| regExp     | 正则表达式             | string  | ——     | 只允许输入纯数字 |

## TODO-List

回调函数

额外提供 medium、small、mini 三种尺寸的数字输入框处理

“+ - ”符号是手动写入的，而不是 xb-icon 传入的，等设计稿出来后进行修改

## 作者列表

| 作者 | 更新时间                    | 主要修改点 |
| :--- | :-------------------------- | :--------- |
| 黄莹 | 2019 年 1 月 30 日 13:14:00 | 搭建组件   |
