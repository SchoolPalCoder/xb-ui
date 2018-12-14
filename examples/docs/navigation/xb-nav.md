# xb-nav 导航菜单

---

## 示例

## 子菜单

<template>
    <xb-nav active-name="person">
      <xb-subnav>
        <template slot="title">
          <xb-icon type="user"></xb-icon>
          内容管理
        </template>
        <xb-nav-item name="person">
          <xb-icon type="user"></xb-icon>
          个人中心
        </xb-nav-item>
        <xb-nav-item name="file">
          <xb-icon type="annex"></xb-icon>
          文件管理
        </xb-nav-item>
        <xb-nav-item name="system">
          <xb-icon type="teaching-setting"></xb-icon>
          系统设置
        </xb-nav-item>
        <xb-nav-item name="pictures">
          <xb-icon type="curriculum"></xb-icon>
          图库管理
        </xb-nav-item>
      </xb-subnav>
      <xb-subnav>
        <template slot="title">
          <xb-icon type="user"></xb-icon>
          内容管理1
        </template>
        <xb-nav-item name="person1">
          <xb-icon type="user"></xb-icon>
          个人中心1
        </xb-nav-item>
        <xb-nav-item name="file1">
          <xb-icon type="annex"></xb-icon>
          文件管理1
        </xb-nav-item>
        <xb-nav-item name="system1">
          <xb-icon type="teaching-setting"></xb-icon>
          系统设置1
        </xb-nav-item>
        <xb-nav-item name="pictures1">
          <xb-icon type="curriculum"></xb-icon>
          图库管理1
        </xb-nav-item>
      </xb-subnav>
    </xb-nav>
</template>

## 侧栏

<template>
    <xb-nav active-name="person">
      <xb-nav-item name="person">
        <xb-icon type="user"></xb-icon>
        个人中心
      </xb-nav-item>
      <xb-nav-item name="file">
        <xb-icon type="annex"></xb-icon>
        文件管理
      </xb-nav-item>
      <xb-nav-item name="system">
        <xb-icon type="teaching-setting"></xb-icon>
        系统设置
      </xb-nav-item>
      <xb-nav-item name="pictures">
        <xb-icon type="curriculum"></xb-icon>
        图库管理
      </xb-nav-item>
    </xb-nav>
</template>

```js
<template>
    <xb-nav mode="vertical" active-name="person">
      <xb-nav-item name="person">
        <xb-icon type="user"></xb-icon>
        个人中心
      </xb-nav-item>
      <xb-nav-item name="file">
        <xb-icon type="annex"></xb-icon>
        文件管理
      </xb-nav-item>
      <xb-nav-item name="system">
        <xb-icon type="teaching-setting"></xb-icon>
        系统设置
      </xb-nav-item>
      <xb-nav-item name="pictures">
        <xb-icon type="curriculum"></xb-icon>
        图库管理
      </xb-nav-item>
    </xb-nav>
</template>
```

## 事件、链接
<template>
    <xb-nav active-name="file" @on-select="handleSelect">
      <xb-nav-item name="person">个人中心</xb-nav-item>
      <xb-nav-item name="file" to="/file">文件管理</xb-nav-item>
      <xb-nav-item name="system" to="/system" target="_blank">系统设置</xb-nav-item>
      <xb-nav-item name="pictures" to="/pictures" replace="true">图库管理</xb-nav-item>
    </xb-nav>
</template>
<script>
  export default {
    methods:{
      handleSelect(value){
        console.log('Received value: %s', value);
      }
    }
  };
</script>

```js
<template>
    <xb-nav active-name="file" @on-select="handleSelect">
      <xb-nav-item name="person">个人中心</xb-nav-item>
      <xb-nav-item name="file" to="/file">文件管理</xb-nav-item>
      <xb-nav-item name="system" to="/system" target="_blank">系统设置</xb-nav-item>
      <xb-nav-item name="pictures" to="/pictures" replace="true">图库管理</xb-nav-item>
    </xb-nav>
</template>
<script>
  export default {
    methods:{
      handleSelect(value){
        console.log('Received value: %s', value);
      }
    }
  };
</script>
```

## API

Menu props
| 属性     | 说明                     | 类型    | 默认值 |
| :------- | :----------------------- | :------ | :----- |
| mode     | 菜单类型，可选值为水平(`horizontal`)、垂直(`vertical`)          | String  | vertical  |
| theme | 菜单主题，可选值为`dark`、`light`、`primary` | String  | primary   |
| active-name | 激活菜单的name值         | String\|Number | '-'  |
| width | 菜单宽度，只在 `mode="vertical"` 时有效。       | String\|Number | 240px  |


Menu events
| 属性     | 说明                     | 返回值    |
| :------- | :----------------------- | :------ |
| on-select     | 选择菜单（`NavItem`）时触发          | name  |

MenuItem props
| 属性     | 说明                     | 类型    | 默认值 |
| :------- | :----------------------- | :------ | :----- |
| name     | 子菜单唯一标识，必填项 | String\|Number  | '-'  |
| to     | 跳转的链接，支持 `vue-router` 对象 | String\|Object  | '-'  |
| replace     | 路由跳转时，开启 replace 将不会向 `history` 添加新记录 | Boolean  | false |
| target  | `a` 链接的 `target` 属性 | String  | _self |
