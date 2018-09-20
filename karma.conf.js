const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const conf = require('./build/config');
const fs = require('fs');

let testFiles;

try {
  testFiles = fs.readdirSync('./test/unit/specs').map(item => {
    return item.replace(/(\.\w+)+/g, '')
  })
} catch (e) {
  if (e.code === 'ENOENT') {
    return;
  }
}

function getFiles(specList) {
  if (!specList) {
    specList = '';
  }

  if (specList.length) {

    return specList.split(',').map(item => {

      if (!testFiles.includes(item.replace(/^\s*|\s*$/g, '')) && item !== '') {

        throw new Error("提示：你的组件名输入有误，请更正后重新输入...");
      } else {

        return './test/unit/specs/' + item.replace(/^\s*|\s*$/g, '') + '.spec.js'
      }
    })
  } else {

    return ['./test/unit/specs/*.spec.js']
  }
}

module.exports = function (config) {

  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    //browsers: ['PhantomJS'],
    browsers: ['Chrome'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec'],
    files: getFiles(config.f),
    preprocessors: {
      './test/unit/specs/*.spec.js': ['webpack', 'sourcemap']
    },
    webpack: {
      mode: 'production',
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: conf.alias,
        modules: ['node_modules']
      },
      module: {
        rules: [
          {
            test: /\.(jsx?|babel|es6)$/,
            include: process.cwd(),
            exclude: conf.jsexclude,
            loader: 'babel-loader'
          },
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              preserveWhitespace: false
            }
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.html$/,
            loader: 'html-loader?minimize=false'
          },
          {
            test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: path.posix.join('static', '[name].[hash:7].[ext]')
            }
          },
          {
            test: /\.svg(\?\S*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: path.posix.join('static', '[name].[hash:7].[ext]')
            }
          },
          {
            test: /\.(gif|png|jpe?g)(\?\S*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: path.posix.join('static', '[name].[hash:7].[ext]')
            }
          }
        ]
      },
      plugins: [
        new ProgressBarPlugin(),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('testing')
        }),
        new webpack.LoaderOptionsPlugin({
          minimize: true
        })
      ]
    },
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './test/unit/coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    plugins: [
      require("karma-coverage"),
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-chai"),
      require("karma-sinon-chai"),
      require("karma-chrome-launcher"),
      require("karma-mocha-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("karma-babel-preprocessor"),
      require("karma-spec-reporter"),
      require("karma-sourcemap-loader")
    ]
  })
}
