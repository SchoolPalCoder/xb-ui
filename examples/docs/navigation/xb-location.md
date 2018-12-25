# xb-location
----

# 概述
显示当前页面路径，方便跳转到路径上任意一级

# 示例

## 基础用法

<xb-location>
  <xb-location-item to="/">Home</xb-location-item>
  <xb-location-item to="/components">Components</xb-location-item>
  <xb-location-item>Xb-location</xb-location-item>
</xb-location>

```js
<xb-location>
  <xb-location-item to="/">Home</xb-location-item>
  <xb-location-item to="/components">Components</xb-location-item>
  <xb-location-item>Xb-location</xb-location-item>
</xb-location>
```

## 带图标
<xb-location>
  <xb-location-item to="/"><xb-icon type="home" size=10 ></xb-icon> Home</xb-location-item>
  <xb-location-item to="/components"><xb-icon type="Attendance" size=10 ></xb-icon> Components</xb-location-item>
  <xb-location-item><xb-icon type="Attendance" size=10 ></xb-icon> Xb-location</xb-location-item>
</xb-location>

```js
<xb-location>
  <xb-location-item to="/"><xb-icon type="home" size=10 ></xb-icon> Home</xb-location-item>
  <xb-location-item to="/components"><xb-icon type="Attendance" size=10 ></xb-icon> Components</xb-location-item>
  <xb-location-item><xb-icon type="Attendance" size=10 ></xb-icon> Xb-location</xb-location-item>
</xb-location>
```


## 自定义分隔符

<xb-location separator=">">
  <xb-location-item to="/">Home</xb-location-item>
  <xb-location-item to="/components">Components</xb-location-item>
  <xb-location-item>Xb-location</xb-location-item>
</xb-location>

```js
<xb-location separator=">">
  <xb-location-item to="/">Home</xb-location-item>
  <xb-location-item to="/components">Components</xb-location-item>
  <xb-location-item>Xb-location</xb-location-item>
</xb-location>
```


## 参数表

### xb-location props

| 参数名       | 参数说明                                     | 类型           | 可选值 | 默认值 |
| ------------ | -------------------------------------------- | -------------- | ------ | ------ |
| separator    | 自定义分隔符                                   | String        | ——     | '/'  |

### xb-location-item props

| 参数名       | 参数说明                                     | 类型           | 可选值 | 默认值 |
| ------------ | -------------------------------------------- | -------------- | ------ | ------ |
| to          | 自定义分隔符                                   | String, Object | ——     | —— |
| replace     | 开启 replace 将不会向 history 添加新记录         | Boolen       | ——     | false |
