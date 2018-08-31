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
        text: '指南',
        link: '/guide/',
      },
      {
        text: '组件',
        link: '/components/'
      }
    ],
    sidebar: {
      '/guide/': [{
        '指南': '指南',
        collapsable: false,
        children: [
          ''
        ]
      }],
      '/components/': [{
        '布局组件': '布局组件',
        collapsable: false,
        children: [
          'layout/layout.html',
          'basic/button'
        ]
      }, {
        '组件': '组件',
        collapsable: false,
        children: [
          ''
        ]
      }]
    }
  },
  // configureWebpack: (config, isServer) => {
  //   console.log(config);
  //   config.module.rules.push({
  //     test: /\.scss$/,
  //     loaders: ['style-loader', 'css-loader', 'sass-loader']
  //   });
  // }
}
