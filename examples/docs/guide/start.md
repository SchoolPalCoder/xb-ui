# 快速上手

## 创建组件

```bash
npm run create:component 组件名
```

## 创建/更新组件文档

```bash
npm run create:componentMd 组件分类文件夹名 组件名
```

## 初始化图标库

在 packages/theme-chalk/src 下加入 fonts 文件夹以及更新 xb-icon.scss 后执行该命令，就可以在图标库上显示更新的图标

```bash
npm run init:icon
```

## 运行

```bash
npm run dev
```

## 整体组件库打包

```bash
npm run dist
```

## 引入组件库

在 main.js 中写入以下内容：

```js
import XbUI from 'xb-ui';
import 'xb-ui/lib/theme-chalk/index.css';

Vue.use(XbUI);
```

或者

```js
import { Button } from 'xb-ui';
import { Card } from 'xb-ui';
import 'xb-ui/lib/theme-chalk/index.css';

Vue.use(Button);
Vue.use(Card);
```

以上代码便完成了 XbUI 的引入。需要注意的是，样式文件需要单独引入。

## 具体使用

比如在业务项目中的某个.vue 文件中,如下使用：

```js
<xb-button type="default">默认按钮</xb-button>
```
