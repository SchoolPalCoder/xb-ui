// const requireComponentMD = require.context(
//   // 其组件目录文档的相对路径
//   '../components',
//   // 是否查询其子目录
//   true,
//   // 匹配基础组件文件名的正则表达式
//   /\*\.md$/,
// );
// console.log(requireComponentMD);
// debugger;

module.exports = {
    title: "XB-UI",
    description: "校宝在线前端基础组件库",
    port: 1818,
    serviceWorker: true,
    evergreen: true,
    repo: "https://github.com/SchoolPalCoder/Xb-Basic-Components", // 添加 github 链接
    themeConfig: {
        repo: "schoolpalcoder/xb-basic-components",
        editLinks: true,
        editLinkText: "在线编辑此文档",
        docsDir: "docs",
        nav: [
            {
                text: "开发指南",
                link: "/guide/",
            },
            {
                text: "组件",
                link: "/components/basic/xb-button",
            },
        ],
        sidebar: {
            "/guide/": [
                {
                    title: "指南",
                    collapsable: false,
                    children: ["", "rules", "install", "start", "updateLog"],
                },
            ],
            "/components/": [
                {
                    title: "基础组件",
                    collapsable: false,
                    children: ["basic/xb-button"],
                },
                {
                    title: "表单组件",
                    collapsable: false,
                    children: ["form/xb-radio", "form/xb-checkbox", "form/xb-form"],
                },
                {
                    title: "表格组件",
                    collapsable: false,
                    children: ["data/xb-table"],
                },
                {
                    title: "通知组件",
                    collapsable: false,
                    children: ["notice/xb-alert"],
                },
                {
                    title: "导航组件",
                    collapsable: false,
                    children: ["navigation/xb-nav"],
                },
                {
                    title: "其他组件",
                    collapsable: false,
                    children: ["others/xb-collapse", "others/xb-card"],
                },
            ],
        },
    },
    configureWebpack: (config) => {
        config.resolve.extensions.push(".ts");
        config.module.rules.push({
            test: /\.ts$/,
            exclude: /node_modules/,
            enforce: "pre",
            loader: "tslint-loader",
        });
        config.module.rules.push({
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
            options: {
                appendTsSuffixTo: [/\.vue$/],
            },
        });
    },
};
