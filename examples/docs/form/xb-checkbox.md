# Checkbox 多选框

## 基础用法

使用 v-model 可以双向绑定数据。

<div class="demo-checkbox">
  <div>
    <xb-checkbox v-model="checked">你喜欢吃香蕉吗？</xb-checkbox>
    <p>checked：{{checked}}</p>
  </div>
</div>

```js
<template>
  <xb-checkbox v-model="checked">你喜欢吃香蕉吗？</xb-checkbox>
</template>

<script>
  export default {
      data () {
          return {
              checked: true
          }
      }
  }
</script>
```

## 禁用复选框

通过设置 disabled 属性来禁用多选框。

<div class="demo-checkbox">
  <div>
    <xb-checkbox disabled>不喜欢？</xb-checkbox>
    <xb-checkbox v-model="checked" disabled="true">不，你喜欢！</xb-checkbox>
  </div>
</div>

```js
<template>
  <xb-checkbox disabled>不喜欢？</xb-checkbox>
  <xb-checkbox v-model="checked" disabled>
    不，你喜欢！
  </xb-checkbox>
</template>
```

## 触发之前

复选框修改值之前，返回 false 或者返回 new Promise 回调为 false 时可以阻止状态改变

<div class="demo-checkbox">
  <div>
    <xb-checkbox v-model="checked" :on-before-change="beforechange">点我一下试试看</xb-checkbox>
  </div>
</div>

```js
<template>
  <xb-checkbox v-model="checked" :on-before-change="beforechange">点我一下试试看</xb-checkbox>
</template>

export default {
    data () {
    },
    methods:{
      beforechange(){
        return false;
      }
    }
}
```

## API

props

| 属性     | 说明                       | 类型                    | 默认值 |
| :------- | :------------------------- | :---------------------- | :----- |
| label    | 复选框文案                 | String, Number          | -      |
| v-model  | 双向绑定数据，控制是否选中 | String, Number, Boolean | -      |
| disabled | 复选框禁用                 | Boolean                 | false  |

events

| 事件名           | 说明               | 返回值 |
| :--------------- | :----------------- | :----- |
| on-before-change | 触发修改之前的回调 |

<script>
    export default {
        data () {
            return {
                checked: true
            }
        },
        methods:{
          beforechange(){
            let res=confirm("你爱我吗？");
            if(!res){
              alert("再见！！！")
              return false;
            }
            alert("你是个好人，但是我不爱你！")
          }
        }
    }
</script>
