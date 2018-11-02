import { XbRouteConfig } from "./types";
import navConfig from "./nav.config.json";

// 注册路由
const registerRoute = (navConfigs) => {
  const routers: XbRouteConfig[] = [];
  const addDocsRoute = (page, folder, index) => {
    if (routers[index] && Array.isArray(routers[index].children)) {
      const child: XbRouteConfig = {
        path: page.path.slice(1),
        name: "component-" + page.text,
        component: (r) => require.ensure([], () => r(require(`docs/${folder}${page.path}.md`))),
      };

      routers[index].children.push(child);
    }
  };
  navConfigs.forEach((navConf, index) => {
    const idxRoute: XbRouteConfig = {
      text: navConf.text,
      path: navConf.path,
      component: (r) => require.ensure([], () => r(require("examples/pages/container.vue"))),
      children: [],
    };
    routers.push(idxRoute);

    if (navConf.children) {
      navConf.children.forEach((nav) => {
        if (nav.href) {
          return;
        }
        if (nav.groups) {
          nav.groups.forEach((group) => {
            group.list.forEach((item) => {
              addDocsRoute(item, group.folder, index);
            });
          });
        } else if (nav.children) {
          nav.children.forEach((child) => {
            addDocsRoute(child, "", index);
          });
        } else {
          addDocsRoute(nav, "", index);
        }
      });
    }
  });

  return routers;
};

const router = registerRoute(navConfig);

export default router;
