import { XbRouteConfig } from "./types";
export const sidebarConfig: XbRouteConfig[] = [
  {
    text: "更新日志",
    path: "/updateLog",
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
            component: (r) => require.ensure([], () => r(require("../docs/components/basic/xb-button.md"))),
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
