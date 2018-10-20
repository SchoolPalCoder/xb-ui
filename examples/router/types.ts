import { RouteConfig } from "vue-router";

// 扩展RouteConfig
export interface XbRouteConfig extends RouteConfig {
    // 路由文案
    text?: string;
    // 子级路由
    children?: XbRouteConfig[];
}

// NavConfig的type
export type NavConfig = {
    [k: string]: XbRouteConfig[];
};
