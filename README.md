# IBU前端VUE基础组件库项目 #

## 说明 ##

这是IBU前端Vue基础组件库项目，目前处于起步阶段，后期需要大家不断的完善组件库内容，演变为强大并且通用的基础组件库。对标Element-UI。

## 项目结构 ##

```txt
.
├── docs        XBUI 静态站点文件夹
|   ├── .vuepress    vuepress 所需要的配置环境文件夹
|   |   ├── public         vuepress 公共静态文件夹
|   |   ├── config.js      vuepress 配置文件
|   |   └── enhanceApp.js  vuepress 应用级别配置文件(组件注入)
|   ├── components   组件文档文件夹
|   |   ├── basic          具体的组件分类文件夹
|   |   └── layout         具体的组件分类文件夹
|   ├── guide        指南说明
|   └── README.md    主页
├── packages    存放我们需要打包的组件
|   ├── ...          vue组件，自己Create
|   └── theme-chalk  vue组件的静态样式
|   |    ├── src           vue组件样式文件夹
|   |    └── gulpfile.js   样式打包脚本，为的是能独立打包样式能做主题包切换
├── tools       项目工具文件夹
|   ├── ...          工具脚本
|   └── utils.js     实用工具类
├── .editorconfig
├── .eslintignore
├── .eslintrc
├── .gitignore
├── package.json
├── README.md
└── yarn.lock
```

## TODO-List ##

1. 组件规则
   - 写一个tools自动生成组件文件结构。包含开发测试用文件，md文件，组件主体文件,参考[Element-UI](https://github.com/ElemeFE/element)
1. 组件文档自动发布
   - 每个组件的demo、对外暴露的接口，参数使用详细说明等能够自动生成文档。
1. 组件打包发布
   - 打包方式，只打包组件主体，不打包附加其他文件
   - 集成到CI环境
   - git hook的自动化处理打包上传，解包下载的钩子开发。
1. 组件改动规则
   - 何时改动组件，由谁来改动组件，怎么改动组件。只做抛转引玉的作用。
1. 单元测试

## 开始 ##

请用yarn安装依赖包

```bash
yarn
```

创建组件

>`创建的组件不需要以Xb开头`

```bash
npm run create:component 组件所属的文档范围  组件名
```

预览文档

```bash
npm run dev:docs
```

## 技术栈 ##

- [vue](https://github.com/vuejs/vue)
- [vuepress](https://github.com/vuejs/vuepress)
