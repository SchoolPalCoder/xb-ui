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
      link: '/components/basic/xb-button'
    }
    ],
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
          'basic/xb-button',
        ]
      },
      {
        title: '表单组件',
        collapsable: false,
        children: [
          'form/xb-radio',
          'form/xb-checkbox',
          'form/xb-form',
        ]
      },
      {
        title: '表格组件',
        collapsable: false,
        children: [
          'data/xb-table'
        ]
      },
      {
        title: '通知组件',
        collapsable: false,
        children: [
          'notice/xb-alert',
        ]
      },
      {
        title: '导航组件',
        collapsable: false,
        children: [
          'navigation/xb-nav'
        ]
      },
      {
        title: '其他组件',
        collapsable: false,
        children: [
          'others/xb-collapse'
        ]
      }]
    }
  },
}
