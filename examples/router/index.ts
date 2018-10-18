import Vue from "vue";
import Router from "vue-router";
import { NavRouterItem } from "./types";
import { navConfig } from "./router-config";

Vue.use(Router);

// 注册组件方式
const addComponent = (router: NavRouterItem[]) => {
    router.forEach((route) => {
        if (route.items) {
            addComponent(route.items);
            routes = routes.concat(route.items);
        } else {
            if (route.type === "pages") {
                route.component = (r) => require.ensure([], () => r(require(`../pages/${route.name}.vue`)));
                return;
            }
            route.component = (r) => require.ensure([], () => r(require(`../docs/${route.name}.md`)));
        }
    });
};

let routes: NavRouterItem[] = [];

Object.keys(navConfig).forEach((header) => {
    routes = routes.concat(navConfig[header]);
});
addComponent(routes);

export default new Router({
    routes,
});
