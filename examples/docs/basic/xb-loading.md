# xb-loading

loading图标

## 基础用法

基础的加载图标用法。

<div class="demo-loading">
  <xb-button type="default" @click="isShow=!isShow">{{isShow?'隐藏':'显示'}}加载框</xb-button>
  <div style="position:relative;width:240px;height:100px;margin-top:10px">
    <xb-loading :load-show="isShow" :custom-class="'relative'" :load-color="color" :load-txt="txt" :load-size="size" :show-txt="showTxt">默认加载弹框</xb-loading>
  </div>
</div>
<script>
export default {
  data(){
    return{
      isShow: true,
      color:'gray',
      size:'20px',
      txt:'页面加载中…',
      showTxt:true
    }
  },
}
</script>

```js

<xb-loading  :load-show="isShow" :load-color="color" :load-size="size">默认加载图标</xb-loading>


export default {
  data() {
    return {
      isShow: false,
      color:'red',
      size:'50'
    };
  },
};
```

## 参数表 1
| 参数名   | 参数说明   | 类型   | 可选值   | 默认值   |
| :------- | :--------- | :----- | -------- | :------- |
| load-show | 显示隐藏加载框 | 布尔值 | 无 | false |
| load-color | 加载图标颜色 | 字符串 | 颜色值 | 主题颜色 |
| load-size | 加载图标大小 | 数字 | 字体大小 | 20px |
| show-txt | 是否显示文字描述 | 布尔值 | true/false | true |
| load-txt | 加载文本描述 | 字符串 | 字符串 | 加载中…|
| custom-class | 加载框是否相对父级元素定位 | 字符串 | 'relative'、'fixed' | 'fixed'|


