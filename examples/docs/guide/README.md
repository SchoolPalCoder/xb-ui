
# 介绍

## 说明 ##

这是IBU前端Vue基础组件库项目，目前处于起步阶段，后期需要大家不断的完善组件库内容，演变为强大并且通用的基础组件库。对标Element-UI。

## 项目结构 ##

```txt
.
├── build       打包配置文件夹
|   ├── entry.js             整个组件打包的入口文件
|   ├── config.js             打包的配置文件
|   ├── gen-cssfile.js        样式合并打包在index.css的配置文件
|   ├── iconinit.js           图标初始化文件，生成icon.json文件
|   ├── webpack.production.js     整体组件打包文件
|   └── webpack.component.js  单个组件打包文件
├── docs        XBUI 静态站点文件夹
|   ├── .vuepress    vuepress 所需要的配置环境文件夹
|   |   ├── public         vuepress 公共静态文件夹
|   |   ├── config.js      vuepress 配置文件
|   |   └── enhanceApp.js  vuepress 应用级别配置文件(组件注入)
|   ├── components   组件文档文件夹
|   |   ├── basic         具体的组件分类文件夹
|   |   ├── form          具体的组件分类文件夹
|   |   ├── layout        具体的组件分类文件夹
|   |   └── notice        具体的组件分类文件夹
|   ├── guide        指南说明
|   |   ├── install.md     安装
|   |   ├── README.md      介绍文档
|   |   ├── start.md       快速开始
|   |   └── updateLog      日志更新
|   └── icon.json    iconinit.js生成出来的图标文件，用于xb-icon.md
|   └── README.md    主页
├── lib           打包后文件夹
|   ├── theme-chakl   打包后样式所在文件夹
|   |   ├── ...            组件对应的样式
|   |   ├── fonts          图标文件夹
|   |   └── index.css      整个组件库的样式
|   ├── ...                单个组件打包后文件
|   └── utils              工具文件夹
|   └── xb-ui.common.js    整个组件库打包后的js文件
├── packages    存放我们需要打包的组件
|   ├── ...               vue组件，自己Create
|   └── theme-chalk       vue组件的静态样式
|   |    ├── src              vue组件样式文件夹
|   |    └── gulpfile.js      样式打包脚本，为的是能独立打包样式能做主题包切换
├── tools       公共文件夹
|   └── utils   工具文件夹
├── test        单元测试文件夹
├── tools       项目工具文件夹
|   ├── create-component.js             创建组件工具
|   ├── create-componentMd.js           创建组件文档工具
|   └── utils.js                        实用工具类
├── .babelrc
├── .editorconfig
├── .eslintignore
├── .eslintrc
├── .gitignore
├── components.json
├── karma.conf.js
├── package.json
├── prettier.config.js     代码自动化规范
└── README.md
```

## TODO-List ##

1. 国际化
1. 单元测试
1. 组件改动审核规则
   - 大家会进行组件CodeReview
   - 每个组在各自分支开发，合并到master需要安然或者少波进行操作

## 技术栈 ##

- [vue](https://github.com/vuejs/vue)
- [vuepress](https://github.com/vuejs/vuepress)

