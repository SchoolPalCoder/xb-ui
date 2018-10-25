import Vue from "vue";
import Router from "vue-router";
import { XbRouteConfig, NavConfig } from "./types";
import { sidebarConfig } from "./sidebar.config";
import { navConfig } from "./header.config";

Vue.use(Router);

// const getFullPath = (router: XbRouteConfig) => {
//     const children = router.children;
//     if (children === undefined) {
//     } else {
//         getFullPath(children);
//     }
//     return;
// };

// // 动态注册组件
// const addComponent = (router: XbRouteConfig[]) => {
//     router.forEach((route) => {
//         route.component = (r) => require.ensure([], () => r(require(`../docs${route.path}.md`)));
//     });
// };

const routes: XbRouteConfig[] = navConfig;

// addComponent(sidebarConfig);

routes[1].children = sidebarConfig;

export default new Router({
    routes,
});
