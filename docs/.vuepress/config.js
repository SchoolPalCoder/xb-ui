// 配置文件 可以配置路由
module.exports = {
    title: 'XB-UI',
    description: 'XB basic components',
    themeConfig: {
        sidebar: [
            {
                title: '首页',
                collapsable: false,
                children: [
                    '/'
                ]
            },
            {
                title: '开始',
                collapsable: false,
                children: [
                    '/start/install/',
                    '/start/language/'
                ]
            },
            {
                title: '组件',
                collapsable: false,
                children: [
                    '/component/button/',
                    '/component/checkbox/'
                ]
            }
        ]
    }
}