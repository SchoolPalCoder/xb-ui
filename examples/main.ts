import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import demoBlock from "./components/demo-block.vue";
import { camelCase, upperFirst } from "lodash";
import "../packages/theme-chalk/src/index.less";

const requireComponent = require.context(
  // 其组件目录的相对路径
  "../packages",
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /index\.ts$/
);

requireComponent.keys().forEach((fileName: string) => {
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
    if (componentName === "XbMessageTips") {
      Vue.prototype.$message = componentConfig.default;
    }
  }
});
Vue.component("demo-block", demoBlock);
Vue.config.productionTip = false;
window.app = new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
