import { XbRouteConfig } from "./types";
import navConfig from "./nav.config.json";
// const navConfig = data as any;

// const navConfig = require("./config.json");

// // 左侧导航条的配置
// const sidebarConfig = () => {
//   const sidebarConf: XbRouteConfig[] = [
//     {
//       text: "更新日志",
//       path: "updateLog/",
//       components: { container: (r) => require.ensure([], () => r(require("guide/updateLog.md"))) },
//     },
//     {
//       text: "开发指南",
//       path: "devguide",
//       children: [
//         {
//           text: "书写规则",
//           path: "rules",
//           component: (r) => require.ensure([], () => r(require("guide/rules.md"))),
//         },
//         {
//           text: "安装",
//           path: "install",
//         },
//         {
//           text: "开始使用",
//           path: "start",
//         },
//       ],
//     },
//     {
//       text: "组件",
//       path: "components",
//       children: [
//         {
//           text: "基础组件",
//           path: "basic",
//           children: [
//             {
//               text: "xb-button",
//               path: "xb-button",
//               component: (r) => require.ensure([], () => r(require("components/basic/xb-button.md"))),
//             },
//           ],
//         },
//         {
//           text: "表单组件",
//           path: "form",
//           children: [],
//         },
//         {
//           text: "数据组件",
//           path: "data",
//           children: [],
//         },
//         {
//           text: "通知组件",
//           path: "notice",
//           children: [],
//         },
//         {
//           text: "导航组件",
//           path: "navigation",
//           children: [],
//         },
//         {
//           text: "其他组件",
//           path: "others",
//           children: [],
//         },
//       ],
//     },
//   ];

//   return sidebarConf;
// };

// // 路由配置
// export const headerConfig = () => {
//   const headerConf: XbRouteConfig[] = [
//     {
//       text: "指南",
//       name: "giude",
//       path: "/guide",
//       component: (r) => require.ensure([], () => r(require("examples/pages/container.vue"))),
//     },
//     {
//       text: "组件",
//       name: "components",
//       path: "/components",
//       component: (r) => require.ensure([], () => r(require("examples/pages/container.vue"))),
//       children: sidebarConfig(),
//     },
//   ];

//   return headerConf;
// };

// 加载doc文件
const LOAD_DOCS = (path, folder) => {
  return (r) => require.ensure([], () => r(require(`docs/${folder}${path}.md`)));
};

// 注册路由
const registerRoute = (navConfigs) => {
  const routers: XbRouteConfig[] = [];
  function addRoute(page, folder, index) {
    const child: XbRouteConfig = {
      path: page.path.slice(1),
      name: "component-" + page.text,
      component: LOAD_DOCS(page.path, folder),
    };

    if (routers[index] && Array.isArray(routers[index].children)) {
      routers[index].children.push(child);
    }
  }
  navConfigs.forEach((navConf) => {
    const idxRoute: XbRouteConfig = {
      text: navConf.text,
      path: navConf.path,
      component: (r) => require.ensure([], () => r(require("examples/pages/container.vue"))),
      children: [],
    };
    routers.push(idxRoute);

    if (navConf.children) {
      navConf.children.forEach((nav, index) => {
        if (nav.href) {
          return;
        }
        if (nav.groups) {
          nav.groups.forEach((group) => {
            group.list.forEach((item) => {
              addRoute(item, group.folder, index);
            });
          });
        } else if (nav.children) {
          nav.children.forEach((child) => {
            addRoute(child, "", index);
          });
        } else {
          addRoute(nav, "", index);
        }
      });
    }
  });

  return routers;
};

const router = registerRoute(navConfig);

export default router;
