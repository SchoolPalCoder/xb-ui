# IBU 前端 VUE 基础组件库项目

## 说明

这是 IBU 前端 Vue 基础组件库项目，目前处于起步阶段，后期需要大家不断的完善组件库内容，演变为强大并且通用的基础组件库。对标 Element-UI。

## 开始开发

1. 本地新建项目文件夹
2. 从新 clone 本项目`master`分支
3. 运行以下命令创建并切换个人分支

```bash
# XXX是个人分支名称
git checkout -b XXX
```

4. 运行以下命令推送新分支到 GitHub

```bash
# XXX是个人分支名称
git push origin XXX:XXX
```

## 编码规范

1. 书写规则
   参考[书写规则](./examples/docs/guide/rules.md)

2. 编辑器及插件要求

- 使用 `VSCODE`
- 包管理使用 `yarn`
- 安装以下插件：
  - `"TSLint"`<br/>
    **代码省察，一定要装！！！**
  - `"TSLint Vue"`<br/>
    **基于 `TS` 开发 `Vue` 需要用到的代码省察，一定要装！！！**
  - `"Vetur"`<br/>
    **`Vue`开发神器，不解释，一定要装！！！**
  - `"Prettier - Code formatter"`<br/>
    **会读取`.prettierrc.yml`自动格式化统一代码，强烈建议装！！！**

## 项目结构

```txt
.
├── build       打包配置文件夹
|   ├── entry.js             整个组件打包的入口文件
|   ├── config.js             打包的配置文件
|   ├── gen-cssfile.js        样式合并打包在index.css的配置文件
|   ├── webpack.production.js     整体组件打包文件
|   └── webpack.component.js  单个组件打包文件
├── examples         XBUI 静态站点文件夹
|   ├── docs       组件文档文件夹
|   |   ├── basic         基础组件分类文件夹
|   |   ├── form          表单组件分类文件夹
|   |   ├── layout        布局组件组件分类文件夹
|   |   ├── notice        提示组件分类文件夹
|   |   └── guide         指南说明文件夹
├── lib           打包后文件夹
|   ├── theme-chakl   打包后样式所在文件夹
|   |   ├── ...            组件对应的样式
|   |   └── index.less      整个组件库的样式
|   ├── ...                单个组件打包后文件
|   └── xb-ui.common.js    整个组件库打包后的js文件
├── packages    存放我们需要打包的组件
|   ├── ...               vue组件，自己Create
|   └── theme-chalk       vue组件的静态样式
|   |    ├── src              vue组件样式文件夹
|   |    └── gulpfile.js      样式打包脚本，为的是能独立打包样式能做主题包切换
├── tools       项目工具文件夹
|   ├── create-component.js             创建组件工具
|   ├── create-componentMd.js           创建组件文档工具
|   ├── update-componentsJson.js        更新components.json文件工具
|   └── utils.js                        实用工具类
├── .babelrc
├── .editorconfig
├── .eslintignore
├── .eslintrc
├── .gitignore
├── components.json
├── package.json
├── prettierrc.yml            代码自动化规范(Prettier插件读取此配置)
└── README.md
```

## TODO-List

1. 单元测试
1. 组件改动审核规则
   - 大家会进行组件 CodeReview
   - 每个人在各自分支开发，合并到 master 需要安然或者少波进行操作

## 开始

创建组件

> `创建的组件需要以Xb-开头`

```bash
yarn create:component 组件名
```

创建文档

> 文件夹仅限于`basic`（基础组件）, `form`（表单组件）, `data`（数据展示组件）, `notice`（提示组件）, `navigation`（导航组件）, `others`（其他）这几个

```bash
yarn create:componentMd 文档文件夹名 组件文档名
```

预览文档

```bash
yarn dev
```

## 技术栈

- [vue](https://github.com/vuejs/vue)

## 安装

目前还未发布到 npm，发布后可以使用以下命令

```bash
yarn add xb-ui
```

#### 关于单元测试移步为知笔记：

> 技术知识库--->IBU--->IBU 技术推进文档--->前端新框架--->关于 xbUI 组件的单元测试.md
