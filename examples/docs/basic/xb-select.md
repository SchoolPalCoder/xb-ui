# xb-select

---

## 基础用法

<div class="demo-button">
  <div>
    <xb-select :options="option1"></xb-select>
  </div>
</div>

```js
<xb-select :options="option1" ></xb-select>;

export default {
  data() {
    return {
      option1:[{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}]
    };
  },
};
```

## 修改默认文案

<div class="demo-button">
  <div>
    <xb-select :options="option1" placeHolder="修改默认值" ></xb-select>
  </div>
</div>

```js
<xb-select :options="option2" placeHolder="修改默认值" ></xb-select>;

export default {
  data() {
    return {
      option2:[{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}]
    };
  },
};
```

## 有禁用选项

某一选项不允许选择

<div class="demo-button">
  <div>
    <xb-select :options="option3" ></xb-select>
  </div>
</div>

```js
<xb-select :options="option3" ></xb-select>;

export default {
  data() {
    return {
      option3: [{value: "这里展示的是筛选项的数据",disabled:true},{value: "value1"},{value: "value2"}]
    };
  },
};
```

## 禁用状态

选择器不可用状态

<div class="demo-button">
  <div>
    <xb-select :options="option4" disabled='true'></xb-select>
  </div>
</div>

```js
<xb-select :options="option4" disabled='true' ></xb-select>;

export default {
  data() {
    return {
      option4: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],
    };
  },
};
```

## 可清空单选

包含清空按钮，可将选择器清空为初始状态

<div class="demo-button">
  <div>
    <xb-select :options="option5" clearable="true"></xb-select>
  </div>
</div>

```js
<xb-select :options="option5" clearable="true" ></xb-select>;

export default {
  data() {
    return {
      option5:[{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],
    };
  },
};
```

## 基础多选

适用性较广的基础多选，用 Tag 展示已选项

<div class="demo-button">
  <div>
    <xb-select :options="option6" multiple='true'></xb-select>
  </div>
</div>

```js
<xb-select :options="option6" multiple='true' ></xb-select>;

export default {
  data() {
    return {
      option6: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],
    };
  },
};
```

## 分组

备选项进行分组展示

<div class="demo-button">
  <div>
    <xb-select :options="option7"></xb-select>
  </div>
</div>

```js
<xb-select :options="option7" ></xb-select>;

export default {
  data() {
    return {
      option7: [{
          title: "这里是标题",
          group:[{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}]
        },{
          title: "title1",
          group:[{value: "value0"},{value: "value1"},{value: "value2"}]
        },{
          title: "title2",
          group:[{value: "value0"},{value: "value1"},{value: "value2"}]
        }]
    };
  },
};
```

## 可搜索

可以利用搜索功能快速查找选项

<div class="demo-button">
  <div>
    <xb-select :options="option8" filterable="true"></xb-select>
  </div>
</div>

```js
<xb-select :options="option8" filterable="true"></xb-select>;

export default {
  data() {
    return {
      option8: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],
    };
  },
};
```

## 外部传入的样式

#### 根据设计稿，设定相关宽度

<div class="demo-button">
  <div>
  <xb-select width="500" :options="option9" ></xb-select>
  </div>
</div>

```html
只修改输入框的尺寸

<xb-select width="500" :options="option9"></xb-select>
```

#### 组件内提供的 3 种尺寸

<div class="demo-button">
  <div>
    <xb-select size="large" :options="option10" ></xb-select>
    <br>
    <xb-select size="medium" :options="option11"></xb-select>
     <br>
    <xb-select size="small" :options="option12"></xb-select>
  </div>
</div>

```html
大尺寸

<xb-select size="large" :options="option10"></xb-select>

默认尺寸

<xb-select size="medium" :options="option11"></xb-select>

小尺寸

<xb-select size="small" :options="option12"></xb-select>
```

<script>
  export default {
    data() {
      return {
        option1: [{
          value: '这里展示的是筛选项的数据',
          label: '这里可以写上配置项的数据'
        },{
          value: 'value1'
        },{
          value: 'value2'
        }],

        option2: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"},{value: "value3"}],

        option3: [{value: '这里展示的是筛选项的数据',disabled:true},{value: 'value1'},{value: 'value2'},{value: "value3"}],

        option4: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"},{value: "value3"}],

        option5: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"},{value: "value3"}],

        option6: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"},{value: "value3"}],

        option7: [{
          title: "这里是标题",
          group:[{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}]
        },{
          title: "title1",
          group:[{value: "value0"},{value: "value1"},{value: "value2"}]
        },{
          title: "title2",
          group:[{value: "value0"},{value: "value1"},{value: "value2"}]
        }],

        option8: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"},{value: "value3"}],

        option9: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"},{value: "value3"}],

        option10: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"},{value: "value3"}],

        option11: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"},{value: "value3"}],

        option12: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"},{value: "value3"}],
      }
    }
  }

</script>

## TODO

在分组的情况下，存在多选的情况

点击旁边，关闭筛选框

展示默认值

## 参数表

| 参数名      | 参数说明       | 类型    | 可选值                 | 默认值    |
| :---------- | :------------- | :------ | :--------------------- | :-------- |
| placeHolder | 输入框占位文本 | string  | ——                     | 请选择... |
| options     | 下拉框的数组   | array   | ——                     | ——        |
| disabled    | 禁用           | boolean | ——                     | false     |
| clearable   | 可清空单选     | boolean | ——                     | false     |
| multiple    | 多选           | boolean | ——                     | false     |
| filterable  | 可搜索         | boolean | ——                     | false     |
| width       | 输入框宽度     | number  | ——                     | 240       |
| size        | 输入框尺寸     | string  | large / medium / small | medium    |
