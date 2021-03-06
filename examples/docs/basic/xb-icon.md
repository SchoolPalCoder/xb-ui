# xb-icon 图标

提供了一套常用的图标集合。

## 基础用法

<div style="margin-top:20px">
  <xb-icon type="activity"></xb-icon>
  <i class="xb-icon-achievement"></i>
</div>

只要引入 class 就可以使用

```html
<xb-icon type="activity"></xb-icon> <i class="xb-icon-achievement"></i>
```

## 图标设置

可以设置 size、color、type

<div style="margin-top:20px">
  <xb-icon type="announcement" size="50px"></xb-icon>
  <xb-icon type="announcement" size="2rem"></xb-icon>
  <xb-icon type="announcement" size=10 ></xb-icon>
  <xb-icon type="announcement" color="red" size="20px"></xb-icon>
</div>

```html
<xb-icon type="announcement" size="50px"></xb-icon>
<xb-icon type="announcement" size="2rem"></xb-icon>
<xb-icon type="announcement" size="10"></xb-icon>
<xb-icon type="announcement" color="red" size="20px"></xb-icon>
```

## 图标集合

如果是 class 引用图标需要手动加上 `xb-icon-` 前缀

<ul class="icon-list">
  <li v-for="name in icons" :key="name">
    <span class="icon-list-span">
      <xb-icon :type="name"></xb-icon>
      <span>{{name}}</span>
    </span>
  </li>
</ul>

<script>
var requireSvg = require.context(
    // 其组件目录的相对路径
    "../../../assets/iconfontSvg",
    // 是否查询其子目录
    false,
    // 匹配基础组件文件名的正则表达式
    /\.svg$/
  );
var iconList=[];
requireSvg.keys().forEach((fileName)=>{
  iconList.push(fileName.replace(/^\.\/(.*)\.svg+$/, "$1"))
});

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

| 参数名 | 参数说明                                                                                    | 类型           | 可选值 | 默认值 |
| :----- | :------------------------------------------------------------------------------------------ | :------------- | ------ | :----- |
| type   | 图标名称                                                                                    | String         | --     | --     |
| size   | 可以通过这个设置图标大小，如果传的是 number 则默认单位为 px,如果是 String 则 px，rem 都可以 | Number、String | --     | --     |
| color  | 可以通过这个设置图标颜色                                                                    | String         | --     | --     |

## 作者列表

| 作者 | 更新时间                    | 主要修改点 |
| :--- | :-------------------------- | :--------- |
| 安然 | 2019 年 1 月 30 日 13:14:00 | 搭建组件   |
