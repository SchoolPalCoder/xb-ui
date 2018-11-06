# 书写规范

## 样式

1. css 样式必须以 `xbui-` 开头，用于区分基础组件样式和业务代码的样式
2. css 文件名和组件文件夹名称一致
3. 在 vue 文件中禁止写样式，禁用 style 代码块，禁用 style 的 `scoped` 属性，为的是后续方便重写样式以满足特殊的业务场景

## 组件

### 命名

- 组件名称尽量简单、表意，可以参考 ElementUI 的组件命名方式，`xb-`开头
- 文件夹名称全部小写，允许使用"-"符号，具体文件名称也都采用小写，至于为什么要用小写参考：[为什么文件名要小写？](http://www.ruanyifeng.com/blog/2017/02/filename-should-be-lowercase.html)

- 文件夹规则统一使用以下规则：

  > - packages
  >   - xb-\*\*\* 具体的组件文件夹，全部小写命名
  >     - src 具体组件文件夹
  >       - \*\*\*.vue 组件文件 1（名称小写）
  >       - \*\*\*.vue 组件文件 2（如果有）
  >     - index.js 组件入口文件

- export 出的对象使用[Pascal 命名法](https://baike.baidu.com/item/%E5%B8%95%E6%96%AF%E5%8D%A1%E5%91%BD%E5%90%8D%E6%B3%95/9464494?fr=aladdin)（首字母大写，不得出现“\_”、“-”等特殊符号）比如 Page、ButtonGroup

### 属性

- 在声明 `prop` 的时候，其命名应该始终使用驼峰命名(首字母小写)。
- 必须给 `prop` 添加 [JSDoc](http://www.css88.com/doc/jsdoc/index.html) 格式的注释。
- 必须规定 `type` 或者使用 `validator` 进行验证
- 如果有尺寸的参数 `size`，只能使用 `small`/`medium`/`large`，默认是 `medium`，组件调用者可以不用写，满足一般使用情况，特殊情况可以使用重写 css 或者 style 覆盖

### 事件

1. 使用 `on-` 为前缀，能够快速区分事件和 prop，比如 `on-change`
2. method 里面的函数名称使用驼峰命名

### 其他

1. 尽量保证组件的功能单一性、可扩展性，能用 slot 解决的问题不要写在组件代码中
2. 组件提交前必须跑单测，合并代码请提交 MergeRequest （暂定陈思源）
3. 其他公约尽量参考[Vue 风格指南](https://cn.vuejs.org/v2/style-guide/index.html)
4. 欢迎补充
