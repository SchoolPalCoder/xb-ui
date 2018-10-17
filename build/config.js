var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var Components = require('../components.json');
var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
var externals = {};

Object.keys(Components).forEach(function (key) {
  externals[`xb-ui/packages/${key}`] = `xb-ui/lib/${key}`;
});

utilsList.forEach(function (file) {
  file = path.basename(file, '.js');
  externals[`xb-ui/src/utils/${file}`] = `xb-ui/lib/utils/${file}`;
});

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.externals = externals;

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'xb-ui': path.resolve(__dirname, '../'),
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue',
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date.\js/;
