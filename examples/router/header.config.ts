import { XbRouteConfig } from "./types";

export default () => {
  const navConfig: XbRouteConfig[] = [
    {
      text: "指南",
      name: "giude",
      path: "/guide/",
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
        {
          text: "更新日志",
          path: "/updateLog",
        },
      ],
    },
    {
      text: "组件",
      path: "/components/",
      children: [],
    },
  ];
  return navConfig;
};
