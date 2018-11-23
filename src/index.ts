import XbButton from "../packages/xb-button/index";
import locale from "./locale";
import { camelCase, upperFirst } from "lodash";

const requireComponent = require.context(
  // 其组件目录的相对路径
  "../packages",
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /index\.ts$/
);

const install = function(Vue, opts = {}) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  requireComponent.keys().forEach((fileName) => {
    if (fileName !== "theme-chalk") {
      // 获取组件配置
      const componentConfig = requireComponent(fileName);

      // 获取组件的 PascalCase 命名
      const componentName = upperFirst(
        camelCase(
          // 剥去文件名开头的 `./` 和结尾的扩展名
          fileName.replace(/^\.\/(.*)\/index\.ts+$/, "$1")
        )
      );

      // 全局注册组件
      Vue.component(
        componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig
      );
    }
  });

  Vue.prototype.$ELEMENT = {
    size: opts.size || "",
    zIndex: opts.zIndex || 2000,
  };
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

module.exports = {
  version: "1.0.0",
  locale: locale.use,
  i18n: locale.i18n,
  install,
  XbButton,
};

module.exports.default = module.exports;
