import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import demoBlock from "./components/demo-block.vue";
import { camelCase, upperFirst } from "lodash";
import Xbui from '../src';
import "../packages/theme-chalk/src/index.scss";

Vue.use(Xbui);

Vue.component("demo-block", demoBlock);
Vue.config.productionTip = false;
window.app = new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
