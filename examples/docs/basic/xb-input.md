<script>
  export default {
    data() {
      return {
        value1_1: '',
        value1_2: '用户输入值',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '这是一个只读的数据',
        value8_1: '',
        value8_2: '',
        value8_3: '',
        value8_4: '',
        value8_5: '',
        value8_6: '',
        value9_1: '',
        value9_2: '',
        value9_3: '',
        value9_4: '',
        value10_1: '',
        value10_2: '',
        value10_3: '',
        value10_4: '',
      };
    }
  };
</script>

# xb-input 输入框

即：input 输入框 或者 textarea 输入框

## 基础用法

<div class="demo-button">
  <div>
    <xb-input v-model="value1_1"></xb-input>
    <br/>
    <xb-input v-model="value1_2"></xb-input>
  </div>
</div>

```html
默认输入文案：请输入，input输入框宽：180px，input输入框高：40px，默认不带可输入icon

<xb-input v-model="value1_1"></xb-input>
<xb-input v-model="value1_2"></xb-input>
<script>
  export default {
    data() {
      return {
        value1_1: "",
        value1_2: "用户输入值",
      };
    },
  };
</script>
```

## 修改默认文案

<div class="demo-button">
  <div>
    <xb-input v-model="value2" placeHolder="修改默认值"></xb-input>
  </div>
</div>

```html
<xb-input v-model="value2" placeHolder="修改默认值"></xb-input>
<script>
  export default {
    data() {
      return {
        value2: "",
      };
    },
  };
</script>
```

## 最大输入字符串长度

<div class="demo-button">
  <div>
    <xb-input v-model="value3" :maxlength="10"></xb-input>
  </div>
</div>

```html
<xb-input v-model="value3" :maxlength="10"></xb-input>
<script>
  export default {
    data() {
      return {
        value3: "",
      };
    },
  };
</script>
```

## 数字最大值

有了最大值后，就只允许输入数字了

<div class="demo-button">
  <div>
    <xb-input v-model="value4" :maxNum="10000"></xb-input>
  </div>
</div>

```html
<xb-input v-model="value4" :maxNum="10000"></xb-input>
<script>
  export default {
    data() {
      return {
        value4: "",
      };
    },
  };
</script>
```

## 正则表达式

只能输入一位小数

<div class="demo-button">
  <div>
    <xb-input v-model="value5" regExp="^(0|[1-9]\d*)(\.\d?)?$"></xb-input>
  </div>
</div>

```html
<xb-input v-model="value5" regExp="^(0|[1-9]\d*)(\.\d?)?$"></xb-input>
<script>
  export default {
    data() {
      return {
        value5: "",
      };
    },
  };
</script>
```

## 禁用

disabled 属性接受一个 Boolean，设置为 true 即可禁用整个组件

<div class="demo-button">
  <div>
    <xb-input v-model="value6" :disabled="true"></xb-input>
  </div>
</div>

```html
<xb-input v-model="value6" :disabled="true"></xb-input>
<script>
  export default {
    data() {
      return {
        value6: "",
      };
    },
  };
</script>
```

## 只读

readonly 属性接受一个 Boolean，设置为 true 便对输入框内容不可编辑

<div class="demo-button">
  <div>
    <xb-input v-model="value7" :readonly="true"></xb-input>
  </div>
</div>

```html
<xb-input v-model="value7" :readonly="true"></xb-input>
<script>
  export default {
    data() {
      return {
        value7: "这是一个只读的数据",
      };
    },
  };
</script>
```

## icon 显示

#### 清空 成功 失败状态

只接受'clearable'，'success'，'fail'三个值

<div class="demo-button">
  <div>
    <xb-input v-model="value8_1" status="clearable"></xb-input>
    <br/>
    <xb-input v-model="value8_2" status="success"></xb-input>
    <br/>
    <xb-input v-model="value8_3" status="fail"></xb-input>
  </div>
</div>

```html
<!-- 清空 -->
<xb-input v-model="value8_1" status="clearable"></xb-input>

<!-- 成功 -->
<xb-input v-model="value8_2" status="success"></xb-input>

<!-- 失败 -->
<xb-input v-model="value8_3" status="fail"></xb-input>

<script>
  export default {
    data() {
      return {
        value8_1: "",
        value8_2: "",
        value8_3: "",
      };
    },
  };
</script>
```

#### 自定义 icon 展示————首部

<div class="demo-button">
  <div>
    <xb-input v-model="value8_4" prefixIcon="search"></xb-input>
  </div>
</div>

```html
<xb-input v-model="value8_4" prefixIcon="search"></xb-input>
<script>
  export default {
    data() {
      return {
        value8_4: "",
      };
    },
  };
</script>
```

#### 自定义 icon 展示————尾部

<div class="demo-button">
  <div>
    <xb-input v-model="value8_5" suffixIcon="edit"></xb-input>
  </div>
</div>

```html
<xb-input v-model="value8_5" suffixIcon="edit"></xb-input>
<script>
  export default {
    data() {
      return {
        value8_5: "",
      };
    },
  };
</script>
```

#### 对自定义的 icon 进行二次样式处理

iconStyle 只有 icon 有作用，对 input 无效

<div class="demo-button">
  <div>
    <xb-input v-model="value8_6" suffixIcon="edit" iconSize="20px" iconColor="red"></xb-input>
  </div>
</div>

```html
<xb-input v-model="value8_6" suffixIcon="edit" cliconSize="20px" iconColor="red"></xb-input>
<script>
  export default {
    data() {
      return {
        value8_6: "",
      };
    },
  };
</script>
```

## 外部传入的样式

#### 根据设计稿，自主定义组件样式

<div class="demo-button">
  <div>
    <xb-input v-model="value9_1" :inputStyle="{'width':'200px','height':'60px','font-size':'20px'}"></xb-input>
  </div>
</div>

```html
只修改input输入框的尺寸

<xb-input v-model="value9_1" :inputStyle="{'width':'200px','height':'60px','font-size':'20px'}"></xb-input>
<script>
  export default {
    data() {
      return {
        value9_1: "",
      };
    },
  };
</script>
```

#### 组件内提供的 3 种尺寸

<div class="demo-button">
  <div>
    <xb-input v-model="value9_2" size="large"></xb-input>
    <br>
    <xb-input v-model="value9_3" size="medium"></xb-input>
     <br>
    <xb-input v-model="value9_4" size="small"></xb-input>
  </div>
</div>

```html
<!-- 大尺寸 -->
<xb-input v-model="value9_2" size="large"></xb-input>
<!-- 默认尺寸 -->
<xb-input v-model="value9_3" size="medium"></xb-input>
<!-- 小尺寸 -->
<xb-input v-model="value9_4" size="small"></xb-input>

<script>
  export default {
    data() {
      return {
        value9_2: "",
        value9_3: "",
        value9_4: "",
      };
    },
  };
</script>
```

## textarea 文本域

以下参数，只适用于 textarea

#### 基本用法

默认只允许输入两行内容

<div class="demo-button">
  <div>
    <xb-input v-model="value10_1" type="textarea"></xb-input>
  </div>
</div>

```html
<xb-input v-model="value10_1" type="textarea"></xb-input>
<script>
  export default {
    data() {
      return {
        value10_1: "",
      };
    },
  };
</script>
```

#### 允许输入 5 行内容

<div class="demo-button">
  <div>
    <xb-input v-model="value10_2" type="textarea" :rows='5'></xb-input>
  </div>
</div>

```html
<xb-input v-model="value10_2" type="textarea" :rows="5"></xb-input>
<script>
  export default {
    data() {
      return {
        value10_2: "",
      };
    },
  };
</script>
```

#### 可自适应文本高度的文本域

<div class="demo-button">
  <div>
    <xb-input v-model="value10_3" type="textarea" :autosize="true"></xb-input>
  </div>
</div>

```html
<xb-input v-model="value10_3" type="textarea" :autosize="true"></xb-input>
<script>
  export default {
    data() {
      return {
        value10_3: "",
      };
    },
  };
</script>
```

#### 文本域高度,可自动进行调整，并指定最小行数和最大行数。

<div class="demo-button">
  <div>
    <xb-input v-model="value10_4" type="textarea" :autosize="{ min: 2, max: 4}"></xb-input>
  </div>
</div>

```html
<xb-input v-model="value10_4" type="textarea" :autosize="{ min: 2, max: 4}"></xb-input>
<script>
  export default {
    data() {
      return {
        value10_4: "",
      };
    },
  };
</script>
```

## 参数表

| 参数名      | 参数说明                               | 类型           | 可选值                                      | 默认值 | 有效范围                                 | 备注                                                       |
| :---------- | :------------------------------------- | :------------- | :------------------------------------------ | :----- | :--------------------------------------- | :--------------------------------------------------------- |
| type        | 输入框的类型                           | string         | text，textarea 和其他 原生 input 的 type 值 | text   |                                          |                                                            |
| placeHolder | 输入框占位文本                         | string         | ——                                          | 请输入 |                                          |                                                            |
| maxlength   | 可输入的最大字符串长度                 | number         | ——                                          | ——     |                                          |                                                            |
| disabled    | 禁用                                   | boolean        | ——                                          | false  |                                          |                                                            |
| readonly    | 只读                                   | boolean        | ——                                          | false  |                                          |                                                            |
| inputStyle  | 外部样式                               | object         | ——                                          | ——     |                                          |                                                            |
| maxNum      | 最大值                                 | number         | ——                                          | ——     | type!="textarea"                         |                                                            |
| regExp      | 正则表达式                             | string         | ——                                          | ——     | type!="textarea"                         |                                                            |
| status      | 清空，成功，失败状态                   | string         | clearable，success，fail                    | ——     | type!="textarea"                         | status,suffixIcon 不允许同时出现,若同时出现，取 suffixIcon |
| prefixIcon  | input 组件 首部 增加自定义的 icon 图标 | string         | ——                                          | ——     | type!="textarea"                         |                                                            |
| suffixIcon  | input 组件 尾部 增加自定义的 icon 图标 | string         | ——                                          | ——     | type!="textarea"                         | status,suffixIcon 不允许同时出现,若同时出现，取 suffixIcon |
| iconSize    | 对 icon 尺寸进行处理                   | string         | ——                                          | ——     | 只有在有存在 icon 的时候，此参数才会有用 |                                                            |
| iconColor   | 对 icon 颜色进行处理                   | string         | ——                                          | ——     | 只有在有存在 icon 的时候，此参数才会有用 |                                                            |
| size        | 输入框尺寸                             | string         | large / medium / small                      | medium | type!="textarea"                         |                                                            |
| rows        | 展示行数                               | number         | ——                                          | 2      | type="textarea"                          |                                                            |
| autosize    | 自适应内容高度                         | boolean/object | 可传入布尔值和对象，如，{ min: 2, max: 6 }  | false  | type="textarea"                          |                                                            |

## 作者列表

| 作者 | 更新时间                    | 主要修改点 |
| :--- | :-------------------------- | :--------- |
| 黄莹 | 2019 年 1 月 30 日 13:14:00 | 搭建组件   |
