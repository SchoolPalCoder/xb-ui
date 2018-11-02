import Vue from "vue";
import Router from "vue-router";
import { XbRouteConfig } from "./types";
import headerConf from "./config";

Vue.use(Router);

const indexRoute: XbRouteConfig = {
  text: "首页",
  name: "index",
  path: "/",
  component: (r) => require.ensure([], () => r(require("examples/pages/index.vue"))),
};

const routes: XbRouteConfig[] = headerConf; // headerConfig();

routes.unshift(indexRoute);
console.log(routes);

export default new Router({
  routes,
});
