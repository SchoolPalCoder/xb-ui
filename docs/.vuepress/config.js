module.exports = {
  title: 'XB-UI',
  description: '校宝在线前端基础组件库',
  port: 1818,
  serviceWorker: true,
  evergreen: true,
  repo: 'https://github.com/SchoolPalCoder/Xb-Basic-Components', // 添加 github 链接
  themeConfig: {
    repo: 'schoolpalcoder/xb-basic-components',
    editLinks: true,
    docsDir: 'docs',
    nav: [{
      text: '开发指南',
      link: '/guide/',
    },
    {
      text: '组件',
      link: '/components/'
    }
    ],
    // sidebar: [
    //   {
    //     title: '开发指南',
    //     collapsable: false,
    //     children: [
    //       '/guide/',
    //       '/guide/install',
    //       '/guide/start',
    //       '/guide/updateLog'
    //     ]
    //   },
    //   {
    //     title: '基础组件',
    //     collapsable: false,
    //     children: [
    //       '/components/basic/button',
    //     ]
    //   },
    //   {
    //     title: '布局组件',
    //     collapsable: false,
    //     children: [
    //       '/components/layout/layout',
    //     ]
    //   },
    //   {
    //     title: '表单组件',
    //     collapsable: false,
    //     children: [
    //       '/components/form/radio',
    //       '/components/form/checkbox',
    //       '/components/form/form',
    //     ]
    //   },
    // ]

    sidebar: {
      '/guide/': [{
        '指南': '指南',
        collapsable: false,
        children: [
          '',
          'install',
          'start',
          'updateLog'
        ]
      }],
      '/components/': [{
        title: '基础组件',
        collapsable: false,
        children: [
          'basic/button',
        ]
      },
      {
        title: '布局组件',
        collapsable: false,
        children: [
          'layout/layout',
        ]
      },
      {
        title: '表单组件',
        collapsable: false,
        children: [
          'form/radio',
          'form/checkbox',
          'form/form',
        ]
      },]
    }
  },
}
