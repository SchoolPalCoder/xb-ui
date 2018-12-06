# xb-text 输入框

即：input 输入框 或者 textarea 输入框

## 基础用法

<div class="demo-button">
  <div>
    <xb-text></xb-text>
  </div>
</div>

```html
默认输入文案：请输入，input输入框宽：180px，input输入框高：40px，默认不带可输入icon

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

## 正则表达式

只能输入一位小数

<div class="demo-button">
  <div>
    <xb-text regExp="^(0|[1-9]\d*)(\.\d?)?$"></xb-text>
  </div>
</div>

```html
只能输入一位小数

<xb-text regExp="^(0|[1-9]\d*)(\.\d?)?$"></xb-text>
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

## icon 显示

#### 清空 成功 失败状态

只接受'clearable'，'success'，'fail'三个值

<div class="demo-button">
  <div>
    <xb-text status="clearable"></xb-text>
    <br/>
    <xb-text status="success"></xb-text>
    <br/>
    <xb-text status="fail"></xb-text>
  </div>
</div>

```html
清空

<xb-text status="clearable"></xb-text>

成功

<xb-text status="success"></xb-text>

失败

<xb-text status="fail"></xb-text>
```

#### 自定义 icon 展示————首部

<div class="demo-button">
  <div>
    <xb-text prefixIcon="xb-icon-edit"></xb-text>
  </div>
</div>

```html
<xb-text prefixIcon="xb-icon-edit"></xb-text>
```

#### 自定义 icon 展示————尾部

<div class="demo-button">
  <div>
    <xb-text suffixIcon="xb-icon-edit"></xb-text>
  </div>
</div>

```html
<xb-text suffixIcon="xb-icon-edit"></xb-text>
```

#### 对自定义的 icon 进行二次样式处理

iconStyle 只有 icon 有作用，对 input 无效

<div class="demo-button">
  <div>
    <xb-text suffixIcon="xb-icon-edit" :iconStyle="{'color':'white','background-color':'red','font-size':'16px'}"></xb-text>
  </div>
</div>

```html
<xb-text suffixIcon="xb-icon-edit" :iconStyle="{'color':'white','background-color':'red','font-size':'16px'}"></xb-text>
```

## 外部传入的样式

#### 根据设计稿，自主定义组件样式

<div class="demo-button">
  <div>
    <xb-text :inputStyle="{'width':'200px','height':'60px','font-size':'20px'}"></xb-text>
  </div>
</div>

```html
只修改input输入框的尺寸

<xb-text :inputStyle="{'width':'200px','height':'60px','font-size':'20px'}"></xb-text>
```

#### 组件内提供的 3 种尺寸

<div class="demo-button">
  <div>
    <xb-text size="large"></xb-text>
    <br>
    <xb-text size="medium"></xb-text>
     <br>
    <xb-text size="small"></xb-text>
  </div>
</div>

```html
大尺寸

<xb-text size="large"></xb-text>

默认尺寸

<xb-text size="medium"></xb-text>

小尺寸

<xb-text size="small"></xb-text>
```

## textarea 文本域

以下参数，只适用于 textarea

#### 基本用法

<div class="demo-button">
  <div>
    <xb-text type="textarea"></xb-text>
  </div>
</div>

```html
<xb-text type="textarea"></xb-text>
```

#### 允许输入 5 行内容

<div class="demo-button">
  <div>
    <xb-text type="textarea" :rows='5'></xb-text>
  </div>
</div>

```html
<xb-text type="textarea" :rows="5"></xb-text>
```

#### 可自适应文本高度的文本域

<div class="demo-button">
  <div>
    <xb-text type="textarea" :autosize="true"></xb-text>
  </div>
</div>

```html
<xb-text type="textarea" :autosize="true"></xb-text>
```

#### 文本域高度,可自动进行调整，并指定最小行数和最大行数。

<div class="demo-button">
  <div>
    <xb-text type="textarea"  :autosize="{ min: 2, max: 4}"></xb-text>
  </div>
</div>

```html
<xb-text type="textarea" :autosize="{ min: 2, max: 4}"></xb-text>
```

[^_^]: update

## 参数表

| 参数名      | 参数说明                               | 类型           | 可选值                                      | 默认值 | 有效范围         | 备注                                                       |
| :---------- | :------------------------------------- | :------------- | :------------------------------------------ | :----- | :--------------- | :--------------------------------------------------------- |
| type        | 输入框的类型                           | string         | text，textarea 和其他 原生 input 的 type 值 | text   |                  |                                                            |
| placeHolder | 输入框占位文本                         | string         | ——                                          | 请输入 |                  |                                                            |
| maxlength   | 可输入的最大字符串长度                 | number         | ——                                          | ——     |                  |                                                            |
| disabled    | 禁用                                   | boolean        | ——                                          | false  |                  |                                                            |
| inputStyle  | 外部样式                               | object         | ——                                          | ——     |                  |                                                            |
| maxNum      | 最大值                                 | number         | ——                                          | ——     | type!="textarea" |                                                            |
| regExp      | 正则表达式                             | string         | ——                                          | ——     | type!="textarea" |                                                            |
| status      | 清空，成功，失败状态                   | string         | clearable，success，fail                    | ——     | type!="textarea" | status,suffixIcon 不允许同时出现,若同时出现，取 suffixIcon |
| prefixIcon  | input 组件 首部 增加自定义的 icon 图标 | string         |                                             | ——     | type!="textarea" |                                                            |
| suffixIcon  | input 组件 尾部 增加自定义的 icon 图标 | string         |                                             | ——     | type!="textarea" | status,suffixIcon 不允许同时出现,若同时出现，取 suffixIcon |
| size        | 输入框尺寸                             | string         | large / medium / small                      | medium | type!="textarea" |                                                            |
| rows        | 展示行数                               | number         | ——                                          | 2      | type="textarea"  |                                                            |
| autosize    | 自适应内容高度                         | boolean/object | 可传入布尔值和对象，如，{ min: 2, max: 6 }  | false  | type="textarea"  |                                                            |
