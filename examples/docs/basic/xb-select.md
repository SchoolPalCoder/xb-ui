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
    <xb-select :options="option2" placeHolder="修改默认值" ></xb-select>
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

## 可传入默认值

#### 不分组，单选，拥有默认值

<div class="demo-button">
  <div>
    <xb-select :options="option8" inputValue="value1"></xb-select>
  </div>
</div>

```js
<xb-select :options="option8" inputValue="value1"></xb-select>;

export default {
  data() {
    return {
    option8: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],
    };
  },
};
```

#### 不分组，多选，拥有默认值

<div class="demo-button">
  <div>
    <xb-select :options="option9" :inputValue="['value1','value2']" multiple='true'></xb-select>
  </div>
</div>

```js
<xb-select :options="option9" :inputValue="['value1','value2']" multiple='true'></xb-select>;

export default {
  data() {
    return {
     option9: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],
    };
  },
};
```

## 可搜索

可以利用搜索功能快速查找选项

#### 默认搜索功能

<div class="demo-button">
  <div>
    <xb-select :options="option10" filterable="true"></xb-select>
  </div>
</div>

```js
<xb-select :options="option10" filterable="true"></xb-select>;

export default {
  data() {
    return {
      option10: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],
    };
  },
};
```

#### 搜索后，下拉列表为空，显示自定义文案

<div class="demo-button">
  <div>
    <xb-select :options="option11" filterable="true" notFoundText="找不到相关内容"></xb-select>
  </div>
</div>

```js
<xb-select :options="option11" filterable="true" notFoundText="找不到相关内容"></xb-select>;

export default {
  data() {
    return {
      option11: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],
    };
  },
};
```

## 外部传入的样式

#### 根据设计稿，设定相关宽度

<div class="demo-button">
  <div>
  <xb-select width="500" :options="option12" ></xb-select>
  </div>
</div>

```js
// 只修改输入框的尺寸
<xb-select width="500" :options="option12" ></xb-select>
export default {
  data() {
    return {
      option12: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],
    };
  },
};
```

#### 组件内提供的 3 种尺寸

<div class="demo-button">
  <div>
    <xb-select size="large" :options="option13" ></xb-select>
    <br>
    <xb-select size="medium" :options="option14"></xb-select>
     <br>
    <xb-select size="small" :options="option15"></xb-select>
  </div>
</div>

```js
// 大尺寸
<xb-select size="large" :options="option13" ></xb-select>

export default {
  data() {
    return {
      option13: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],
    };
  },
};


// 默认尺寸
<xb-select size="medium" :options="option14" ></xb-select>

export default {
  data() {
    return {
      option14: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],
    };
  },
};


// 小尺寸
<xb-select size="small" :options="option15" ></xb-select>

export default {
  data() {
    return {
      option15: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],
    };
  },
};
```

#### 输入框，无边框样式展示

<div class="demo-button">
  <div>
  <xb-select :options="option16" :borderShow="false"></xb-select>
  </div>
</div>

```js
// 只修改输入框的尺寸
<xb-select :options="option16" borderShow="false" ></xb-select>

export default {
  data() {
    return {
      option16: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],
    };
  },
};
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

        option2: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],

        option3: [{value: '这里展示的是筛选项的数据',disabled:true},{value: 'value1'},{value: 'value2'}],

        option4: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],

        option5: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],

        option6: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],

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

        option8: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],

        option9: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],

        option10: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],

        option11: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],

        option12: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],

        option13: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],

        option14: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],

        option15: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],

        option16: [{value: "这里展示的是筛选项的数据"},{value: "value1"},{value: "value2"}],
      }
    }
  }

</script>

## TODO

在分组的情况下，存在多选的情况

在分组的情况下，展示默认值

根据页面高度，将筛选框往上或往下展示

## 参数表

| 参数名       | 参数说明                                   | 类型    | 可选值                 | 默认值     |
| :----------- | :----------------------------------------- | :------ | :--------------------- | :--------- |
| placeHolder  | 输入框占位文本                             | string  | ——                     | 请选择...  |
| inputValue   | 将被选中的数据，在初始化前就展示出来       | any     | ——                     | ——         |
| options      | 下拉框的数组                               | array   | ——                     | ——         |
| disabled     | 禁用                                       | boolean | ——                     | false      |
| clearable    | 可清空单选                                 | boolean | ——                     | false      |
| multiple     | 多选                                       | boolean | ——                     | false      |
| filterable   | 可搜索                                     | boolean | ——                     | false      |
| notFoundText | 当下拉列表为空时显示的内容（仅搜索时可用） | string  | ——                     | 无匹配数据 |
| width        | 输入框宽度                                 | number  | ——                     | 240        |
| size         | 输入框尺寸                                 | string  | large / medium / small | medium     |
