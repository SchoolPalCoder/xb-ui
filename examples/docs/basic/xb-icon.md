# xb-icon 图标
提供了一套常用的图标集合。

## 基础用法

<div style="margin-top:20px">
  <xb-icon type="activity"></xb-icon>
  <i class="xb-icon-achievement"></i>
</div>

只要引入class就可以使用
```html
  <xb-icon type="activity"></xb-icon>
  <i class="xb-icon-achievement"></i>
```

## 图标设置
可以设置size、color、type

<div style="margin-top:20px">
  <xb-icon type="announcement" size="50px"></xb-icon>
  <xb-icon type="announcement" size="2rem"></xb-icon>
  <xb-icon type="announcement" size=10 ></xb-icon>
  <xb-icon type="announcement" color="red" size="20px"></xb-icon>
</div>

```html
  <xb-icon type="announcement" size="50px"></xb-icon>
  <xb-icon type="announcement" size="2rem"></xb-icon>
  <xb-icon type="announcement" size=10 ></xb-icon>
  <xb-icon type="announcement" color="red" size="20px"></xb-icon>
```

## 图标集合
如果是class引用图标需要手动加上 `xb-icon-` 前缀

<ul class="icon-list">
  <li v-for="name in icons" :key="name">
    <span class="icon-list-span">
      <i :class="'xb-icon-' + name"></i>
      <span>{{name}}</span>
    </span>
  </li>
</ul>

<script>
var iconList = require('../icon.json');

export default {
  data() {
    return {
      icons: iconList
    };
  }
}
</script>

<style>
.icon-list{
    overflow: hidden;
    list-style: none;
    padding: 0;
    border: 1px solid #eaeefb;
    border-radius: 4px;
}
.icon-list li {
    float: left;
    width: 16.66%;
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    transition: color .15s linear;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;
}
.icon-list-span{
    display: inline-block;
    line-height: normal;
    vertical-align: middle;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
}
.icon-list-span i{
  display: block;
  font-size: 32px;
  margin-bottom: 15px;
  color: #606266;
}
</style>

## 参数表


|参数名|参数说明|类型|可选值|默认值
|:----|:---|:-----|-----|:-----|
|type|图标名称|String|--|--|
|size|可以通过这个设置图标大小，如果传的是number则默认单位为px,如果是String则px，rem都可以|Number、String|--|--|
|color|可以通过这个设置图标颜色|String|--|--|

