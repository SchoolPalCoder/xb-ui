# xb-radio

---

# 概述

基本组件-单选框。主要用于一组可选项单项选择，或者单独用于切换到选中状态。

# 示例

## 基础用法

单个绑定 `v-model`, 设置`disabled` 控制是否禁用, `on-change`事件可以设置在单个 radio 上

<xb-radio v-model="model1" >选中</xb-radio>
<xb-radio v-model="model2" @on-change="change">未选中</xb-radio>
<xb-radio v-model="model3" disabled>选中禁用</xb-radio>
<xb-radio v-model="model4" disabled>未选中禁用</xb-radio>

```js
<xb-radio v-model="model1">选中</xb-radio>
<xb-radio v-model="model2">未选中</xb-radio>
<xb-radio v-model="model3" disabled>选中禁用</xb-radio>
<xb-radio v-model="model4" disabled>未选中禁用</xb-radio>
<script>
  export default {
    data () {
      return {
        model1: true,
        model2: false,
        model3: true,
        model4: false,
      }
    },
    methods: {
      change () {
        this.$message.info({
          text:'change提示',
          duration:'20000',
          closable:true
        });
      }
    }
  }
</script>
```

## 组合使用

使用 `xb-radio-group` 达到一组互斥的单选框, 在组合使用时，`on-change` 事件只能设置在 group 上才能生效

<xb-radio-group v-model="model5" @on-change="change1">
<xb-radio label="小奶狗"></xb-radio>
<xb-radio label="小狼狗"></xb-radio>
<xb-radio label="小野狗"></xb-radio>
</xb-radio-group>

<p>你喜欢{{model5}}</p>

```js
<xb-radio-group v-model="model5">
  <xb-radio label="小奶狗"></xb-radio>
  <xb-radio label="小狼狗"></xb-radio>
  <xb-radio label="小野狗"></xb-radio>
</xb-radio-group>
<script>
  export default {
    data () {
      return {
        model5: "小奶狗"
      }
    },
    change1 () {
      this.$message.info({
        text:'已选择'+this.model5,
        duration:'20000',
        closable:true
      });
    }
  }
</script>
```

## 垂直使用

设置 `vertical` 达到垂直显示，使用这个的同时不能使用 `type`

<xb-radio-group v-model="model7" vertical="vertical">
  <xb-radio label="大海"></xb-radio>
  <xb-radio label="天空"></xb-radio>
  <xb-radio label="森林"></xb-radio>
</xb-radio-group>
<p>你喜欢{{model7}}</p>

```js
<xb-radio-group v-model="model7" vertical="vertical">
  <xb-radio label="大海"></xb-radio>
  <xb-radio label="天空"></xb-radio>
  <xb-radio label="森林"></xb-radio>
</xb-radio-group>
<script>
  export default {
    data () {
      return {
        model7: "森林",
        vertical:true
      }
    }
  }
</script>
```

## 按钮组

设置 `type` 为 button 属性

<xb-radio-group v-model="model6" type="button">
  <xb-radio label="烤肉"></xb-radio>
  <xb-radio label="火锅"></xb-radio>
  <xb-radio label="日料"></xb-radio>
</xb-radio-group>
<p>你喜欢吃{{model6}}</p>

```js
<xb-radio-group v-model="model6" type="button">
  <xb-radio label="烤肉"></xb-radio>
  <xb-radio label="火锅"></xb-radio>
  <xb-radio label="日料"></xb-radio>
</xb-radio-group>
<script>
  export default {
    data () {
      return {
        model6: "火锅"
      }
    }
  }
</script>
```

## 带边框

设置 `border` 属性可以变成带边框样式

<xb-radio-group v-model="model8">
  <xb-radio label="新白鹿" border="border"></xb-radio>
  <xb-radio label="外婆家" border="border"></xb-radio>
  <xb-radio label="弄堂里" border="border"></xb-radio>
</xb-radio-group>
<p>中午吃{{model8}}</p>

```js
<xb-radio-group v-model="model8">
  <xb-radio label="新白鹿" border="border"></xb-radio>
  <xb-radio label="外婆家" border="border"></xb-radio>
  <xb-radio label="弄堂里" border="border"></xb-radio>
</xb-radio-group>
<script>
  export default {
    data () {
      return {
        model8: "外婆家",
        border:true
      }
    }
  }
</script>
```

## 设置大小

通过 `size` 设置大小

<xb-radio-group v-model="model9">
  <xb-radio label="加拿大鹅绒" size="small"></xb-radio>
  <xb-radio label="波司登" size="medium"></xb-radio>
  <xb-radio label="其他" size="large"></xb-radio>
</xb-radio-group>
<p>羽绒服买{{model9}}</p>

```js
<xb-radio-group v-model="model9">
  <xb-radio label="加拿大鹅绒" size="small"></xb-radio>
  <xb-radio label="波司登" size="medium"></xb-radio>
  <xb-radio label="其他" size="large"></xb-radio>
</xb-radio-group>
<script>
  export default {
    data () {
      return {
        model9: "波司登"
      }
    }
  }
</script>
```

<script>
  export default {
    data () {
      return {
        model1: true,
        model2: false,
        model3: true,
        model4: false,
        model5: "小奶狗",
        model6: "火锅",
        model7: "森林",
        vertical:true,
        model8: "外婆家",
        border:true,
        model9: "波司登"
      }
    },
    methods: {
      change () {
        this.$message.info({
          text:'change提示',
          duration:'20000',
          closable:true
        });
      },
      change1 () {
        this.$message.info({
          text:'已选择'+this.model5,
          duration:'20000',
          closable:true
        });
      }
    }
  }
</script>

## 参数表

### xb-radio props

| 参数名   | 参数说明                                                                  | 类型           | 可选值 | 默认值 |
| -------- | ------------------------------------------------------------------------- | -------------- | ------ | ------ |
| value    | 只在单独使用时有效。可以使用 v-model 双向绑定数据                         | Boolean        | ——     | false  |
| label    | 只在组合使用时有效。指定当前选项的 value 值，组合会自动判断当前选择的项目 | String ,Number | ——     | ——     |
| disabled | 是否禁用当前项                                                            | Boolean        | ——     | false  |
| size     | 单选框的尺寸，可选值为 large、small、medium 或者不设置                    | String         | ——     | ——     |
| border   | 可设置按钮样式有边框                                                      | Boolean        | ——     | false  |

### xb-radio events

| 事件名    | 说明                                                                     | 返回值 |
| --------- | ------------------------------------------------------------------------ | ------ |
| on-change | 在选项状态发生改变时触发，返回当前状态。通过修改外部的数据改变时不会触发 | ——     |

### xb-radio-group props

| 参数名   | 参数说明                                               | 类型    | 可选值 | 默认值 |
| -------- | ------------------------------------------------------ | ------- | ------ | ------ |
| value    | 只在单独使用时有效。可以使用 v-model 双向绑定数据      | Boolean | ——     | false  |
| type     | 可选值为 button 或不填，为 button 时使用按钮样式       | String  | ——     | ——     |
| vertical | 是否垂直排列，按钮样式下无效                           | Boolean | ——     | false  |
| size     | 单选框的尺寸，可选值为 large、small、medium 或者不设置 | String  | ——     | ——     |

### xb-radio-group events

| 事件名    | 说明                                                                     | 返回值 |
| --------- | ------------------------------------------------------------------------ | ------ |
| on-change | 在选项状态发生改变时触发，返回当前状态。通过修改外部的数据改变时不会触发 | ——     |

## 作者列表

| 作者 | 更新时间                    | 主要修改点 |
| :--- | :-------------------------- | :--------- |
| 安然 | 2019 年 1 月 30 日 13:14:00 | 搭建组件   |
