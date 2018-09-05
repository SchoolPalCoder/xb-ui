# 样式库说明

## 目录 文件夹只是暂定的

|-- common  (全局样式)

|-- mixins  (混入)

|-- index.scss (整个样式的入口文件，打包后在dist生成)

|-- button.scss (button组件的样式，如果需要单个组件能单独引用，将样式直接放在src下)

## 引用整体样式
```html
<link rel="stylesheet" href="整体包打包后地址/theme-chalk/dist/index.css">
```

## 引用单个组件样式
```html
<link rel="stylesheet" href="整体包打包后地址/theme-chalk/dist/button.css">
```
