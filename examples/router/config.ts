import { XbRouteConfig } from "./types";

// 左侧导航条的配置
const sidebarConfig = () => {
  const sidebarConf: XbRouteConfig[] = [
    {
      text: "更新日志",
      path: "/updateLog",
      component: (r) => require.ensure([], () => r(require("guide/updateLog.md"))),
    },
    {
      text: "开发指南",
      path: "/devguide/",
      children: [
        {
          text: "书写规则",
          path: "/rules",
        },
        {
          text: "安装",
          path: "/install",
        },
        {
          text: "开始使用",
          path: "/start",
        },
      ],
    },
    {
      text: "组件",
      path: "/components/",
      children: [
        {
          text: "基础组件",
          path: "/basic/",
          children: [
            {
              name: "xb-button",
              path: "/xb-button",
              component: (r) => require.ensure([], () => r(require("components/basic/xb-button.md"))),
            },
          ],
        },
        {
          text: "表单组件",
          path: "/form/",
          children: [],
        },
        {
          text: "数据组件",
          path: "/data/",
          children: [],
        },
        {
          text: "通知组件",
          path: "/notice/",
          children: [],
        },
        {
          text: "导航组件",
          path: "/navigation/",
          children: [],
        },
        {
          text: "其他组件",
          path: "/others/",
          children: [],
        },
      ],
    },
  ];

  return sidebarConf;
};

// 路由配置
export const headerConfig = () => {
  const headerConf: XbRouteConfig[] = [
    {
      text: "指南",
      name: "giude",
      path: "/guide/",
    },
    {
      text: "组件",
      name: "components",
      path: "/components/",
      children: sidebarConfig(),
    },
  ];

  return headerConf;
};
