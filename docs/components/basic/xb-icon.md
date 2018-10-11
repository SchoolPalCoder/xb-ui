---
sidebarDepth: 1
---

# xb-icon
提供了一套常用的图标集合。

## 基础用法

<div style="margin-top:20px">
  <xb-icon class="xbui-icon-pencil"></xb-icon>
  <i class="xbui-icon-image"></i>
  <i class="xbui-icon-tongue"></i>
  <i class="xbui-icon-grin"></i>
</div>

只要引入class就可以使用
```html
  <xb-icon class="xbui-icon-pencil"></xb-icon>
  <i class="xbui-icon-image"></i>
  <i class="xbui-icon-tongue"></i>
  <i class="xbui-icon-grin"></i>
```

## 图标集合

<ul class="icon-list">
  <li v-for="name in icons" :key="name">
    <span class="icon-list-span">
      <i :class="'xbui-icon-' + name"></i>
      <span>{{'xbui-icon-' + name}}</span>
    </span>
  </li>
</ul>

<script>
var iconList = require('../../icon.json');

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
