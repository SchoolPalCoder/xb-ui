import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import demoBlock from "./components/demo-block.vue";
import { upperFirst } from "lodash";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

const requireComponent = require.context(
    // 其组件目录的相对路径
    "../packages",
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /index\.js$/,
);

requireComponent.keys().forEach((fileName: string) => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName);

    // 获取组件的 PascalCase 命名
    const componentName =
        "Xb" +
        upperFirst(
            // 剥去文件名开头的 `./` 和结尾的扩展名
            fileName.replace(/^\.\/(.*)\/index\.js+$/, "$1"),
        );

    // 全局注册组件
    Vue.component(
        componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig,
    );
});

Vue.use(ElementUI);
Vue.component("demo-block", demoBlock);
Vue.config.productionTip = false;

/* tslint:disable-next-line:no-unused-expression */
new Vue({
    el: "#app",
    router,
    render: (h) => h(App),
});
