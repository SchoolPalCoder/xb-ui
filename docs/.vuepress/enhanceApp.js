/**
 * 扩展 VuePress 应用
 */
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

const requireComponent = require.context(
  // 其组件目录的相对路径
  '../../packages',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /index\.js$/
)

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  Vue.use(Element);

  requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName);

    // 获取组件的 PascalCase 命名
    const componentName = 'Xb' + upperFirst(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\/index\.js+$/, '$1')
    );

    // 全局注册组件
    Vue.component(
      componentName,
      // 如果这个组件选项是通过 `export default` 导出的，
      // 那么就会优先使用 `.default`，
      // 否则回退到使用模块的根。
      componentConfig.default || componentConfig
    )
  });
}
