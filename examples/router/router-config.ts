import { NavConfig } from "./types";
export const navConfig: NavConfig = {
    开发指南: [
        {
            name: "giud",
            path: "/giud",
            desc: "介绍",
        },
        {
            name: "install",
            path: "/install",
            desc: "安装",
        },
        {
            name: "start",
            path: "/start",
            desc: "快速开始",
        },
        {
            name: "index",
            path: "/",
            type: "pages",
        },
        {
            name: "logs",
            path: "/logs",
            desc: "更新日志",
        },
    ],
    组件: [
        {
            desc: "基础组件",
            path: "/component",
            items: [
                {
                    desc: "Layout 布局",
                    name: "layout",
                    path: "/layout",
                },
                {
                    desc: "xbIcon 图标",
                    name: "icon",
                    path: "/icon",
                },
                {
                    desc: "xbButton 按钮",
                    name: "button",
                    path: "/button",
                },
                {
                    desc: "xbTag 标签",
                    name: "tag",
                    path: "/tag",
                },
            ],
        },
        {
            desc: "视图组件",
            path: "/component",
            items: [
                {
                    desc: "xbShowmore 显示更多",
                    name: "show-more",
                    path: "/showMore",
                },
                {
                    desc: "xbLimit 限制输入域",
                    name: "limit-textarea",
                    path: "/limit",
                },
                {
                    desc: "xbAlert 警告",
                    name: "alert",
                    path: "/alert",
                },
                {
                    desc: "xbLoadingBar 加载进度条",
                    name: "loading-bar",
                    path: "/loadingBar",
                },
            ],
        },
    ],
};
