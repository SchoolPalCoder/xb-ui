# IBU前端VUE基础组件库项目 #

## 说明 ##

这是IBU前端Vue基础组件库项目，目前处于起步阶段，后期需要大家不断的完善组件库内容，演变为强大并且通用的基础组件库。对标Element-UI。

## TODO-List ##

1. 组件规则
   - 写一个tools自动生成组件文件结构。包含开发测试用文件，mdx文件，组件主体文件,参考[Element-UI](https://github.com/ElemeFE/element)
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

```bash
npm run create:components
```

## 技术栈 ##

- [vue](https://github.com/vuejs/vue)
- [vuepress](https://github.com/vuejs/vuepress)
