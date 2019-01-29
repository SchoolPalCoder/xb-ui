# xb-input 输入框

即：input 输入框 或者 textarea 输入框

## 基础用法

<div class="demo-button">
  <div>
    <xb-input></xb-input>
  </div>
</div>

```html
默认输入文案：请输入，input输入框宽：180px，input输入框高：40px，默认不带可输入icon

<xb-input></xb-input>
```

## 修改默认文案

<div class="demo-button">
  <div>
    <xb-input placeHolder="修改默认值"></xb-input>
  </div>
</div>

```html
<xb-input placeHolder="修改默认值"></xb-input>
```

## 最大输入字符串长度

<div class="demo-button">
  <div>
    <xb-input maxlength="10"></xb-input>
  </div>
</div>

```html
<xb-input maxlength="10"></xb-input>
```

## 数字最大值

有了最大值后，就只允许输入数字了

<div class="demo-button">
  <div>
    <xb-input :maxNum="10000"></xb-input>
  </div>
</div>

```html
<xb-input :maxNum="10000"></xb-input>
```

## 正则表达式

只能输入一位小数

<div class="demo-button">
  <div>
    <xb-input regExp="^(0|[1-9]\d*)(\.\d?)?$"></xb-input>
  </div>
</div>

```html
只能输入一位小数

<xb-input regExp="^(0|[1-9]\d*)(\.\d?)?$"></xb-input>
```

## 禁用

disabled 属性接受一个 Boolean，设置为 true 即可禁用整个组件

<div class="demo-button">
  <div>
    <xb-input disabled="true"></xb-input>
  </div>
</div>

```html
<xb-input disabled="true"></xb-input>
```

## 只读

readonly 属性接受一个 Boolean，设置为 true 便对输入框内容不可编辑

<div class="demo-button">
  <div>
    <xb-input readonly="true"></xb-input>
  </div>
</div>

```html
<xb-input readonly="true"></xb-input>
```

## icon 显示

#### 清空 成功 失败状态

只接受'clearable'，'success'，'fail'三个值

<div class="demo-button">
  <div>
    <xb-input status="clearable"></xb-input>
    <br/>
    <xb-input status="success"></xb-input>
    <br/>
    <xb-input status="fail"></xb-input>
  </div>
</div>

```html
清空

<xb-input status="clearable"></xb-input>

成功

<xb-input status="success"></xb-input>

失败

<xb-input status="fail"></xb-input>
```

#### 自定义 icon 展示————首部

<div class="demo-button">
  <div>
    <xb-input prefixIcon="xb-icon-edit"></xb-input>
  </div>
</div>

```html
<xb-input prefixIcon="xb-icon-edit"></xb-input>
```

#### 自定义 icon 展示————尾部

<div class="demo-button">
  <div>
    <xb-input suffixIcon="xb-icon-edit"></xb-input>
  </div>
</div>

```html
<xb-input suffixIcon="xb-icon-edit"></xb-input>
```

#### 对自定义的 icon 进行二次样式处理

iconStyle 只有 icon 有作用，对 input 无效

<div class="demo-button">
  <div>
    <xb-input suffixIcon="xb-icon-edit" :iconStyle="{'color':'white','background-color':'red','font-size':'16px'}"></xb-input>
  </div>
</div>

```html
<xb-input suffixIcon="xb-icon-edit" :iconStyle="{'color':'white','background-color':'red','font-size':'16px'}"></xb-input>
```

## 外部传入的样式

#### 根据设计稿，自主定义组件样式

<div class="demo-button">
  <div>
    <xb-input :inputStyle="{'width':'200px','height':'60px','font-size':'20px'}"></xb-input>
  </div>
</div>

```html
只修改input输入框的尺寸

<xb-input :inputStyle="{'width':'200px','height':'60px','font-size':'20px'}"></xb-input>
```

#### 组件内提供的 3 种尺寸

<div class="demo-button">
  <div>
    <xb-input size="large"></xb-input>
    <br>
    <xb-input size="medium"></xb-input>
     <br>
    <xb-input size="small"></xb-input>
  </div>
</div>

```html
大尺寸

<xb-input size="large"></xb-input>

默认尺寸

<xb-input size="medium"></xb-input>

小尺寸

<xb-input size="small"></xb-input>
```

## textarea 文本域

以下参数，只适用于 textarea

#### 基本用法

<div class="demo-button">
  <div>
    <xb-input type="textarea"></xb-input>
  </div>
</div>

```html
<xb-input type="textarea"></xb-input>
```

#### 允许输入 5 行内容

<div class="demo-button">
  <div>
    <xb-input type="textarea" :rows='5'></xb-input>
  </div>
</div>

```html
<xb-input type="textarea" :rows="5"></xb-input>
```

#### 可自适应文本高度的文本域

<div class="demo-button">
  <div>
    <xb-input type="textarea" :autosize="true"></xb-input>
  </div>
</div>

```html
<xb-input type="textarea" :autosize="true"></xb-input>
```

#### 文本域高度,可自动进行调整，并指定最小行数和最大行数。

<div class="demo-button">
  <div>
    <xb-input type="textarea"  :autosize="{ min: 2, max: 4}"></xb-input>
  </div>
</div>

```html
<xb-input type="textarea" :autosize="{ min: 2, max: 4}"></xb-input>
```

[^_^]: update

## 参数表

| 参数名      | 参数说明                               | 类型           | 可选值                                      | 默认值 | 有效范围         | 备注                                                       |
| :---------- | :------------------------------------- | :------------- | :------------------------------------------ | :----- | :--------------- | :--------------------------------------------------------- |
| type        | 输入框的类型                           | string         | text，textarea 和其他 原生 input 的 type 值 | text   |                  |                                                            |
| placeHolder | 输入框占位文本                         | string         | ——                                          | 请输入 |                  |                                                            |
| maxlength   | 可输入的最大字符串长度                 | number         | ——                                          | ——     |                  |                                                            |
| disabled    | 禁用                                   | boolean        | ——                                          | false  |                  |                                                            |
| readonly    | 只读                                   | boolean        | ——                                          | false  |                  |                                                            |
| inputStyle  | 外部样式                               | object         | ——                                          | ——     |                  |                                                            |
| maxNum      | 最大值                                 | number         | ——                                          | ——     | type!="textarea" |                                                            |
| regExp      | 正则表达式                             | string         | ——                                          | ——     | type!="textarea" |                                                            |
| status      | 清空，成功，失败状态                   | string         | clearable，success，fail                    | ——     | type!="textarea" | status,suffixIcon 不允许同时出现,若同时出现，取 suffixIcon |
| prefixIcon  | input 组件 首部 增加自定义的 icon 图标 | string         |                                             | ——     | type!="textarea" |                                                            |
| suffixIcon  | input 组件 尾部 增加自定义的 icon 图标 | string         |                                             | ——     | type!="textarea" | status,suffixIcon 不允许同时出现,若同时出现，取 suffixIcon |
| size        | 输入框尺寸                             | string         | large / medium / small                      | medium | type!="textarea" |                                                            |
| rows        | 展示行数                               | number         | ——                                          | 2      | type="textarea"  |                                                            |
| autosize    | 自适应内容高度                         | boolean/object | 可传入布尔值和对象，如，{ min: 2, max: 6 }  | false  | type="textarea"  |                                                            |
