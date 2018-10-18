// Nav路由条配置type
export type NavRouterItem = {
    name?: string;
    path: string;
    desc?: string;
    type?: string;
    items?: NavRouterItem[];
};

// NavConfig的type
export type NavConfig = {
    [k: string]: NavRouterItem[];
};
