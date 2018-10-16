/**
 * npm run create:component 组件名
 */
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const utils = require('./utils');

var component = {
  name: process.argv[2].toLowerCase(),
}

// xb-button 转换成 XbButton
var transformName = (component) => {
  let arr = component.name.toLowerCase().split("-");
  let newArr = [];
  arr.forEach(item => {
    item = item.charAt(0).toUpperCase() + item.substring(1);//给字符串开头第一个变成大写'
    newArr.push(item);
  })
  let newComponentName = newArr.join("");
  return newComponentName;
}

// package/组件/index.js
var indexJS = (component) => {
  let newComponentName = transformName(component);
  return `
import ${newComponentName} from './src/${component.name}.vue';

${newComponentName}.install = function (Vue) {
  Vue.component(${newComponentName}.name, ${newComponentName});
};

export default ${newComponentName};
  `;
}

// package/组件/src/组件.vue
var indexVue = (component) => {
  let newComponentName = transformName(component);
  return `
<template>

</template>

<script>
export default {
  name: '${newComponentName}',
};
</script>
  `;
}

// package/theme-chalk/index.scss update
var updateIndexScss = (component) => {
  return `@import "./${component.name}.scss";\n`
}

let dir = path.resolve(__dirname, '../packages');
let cssDir = path.resolve(__dirname, '../packages/theme-chalk');
//packages 增加对应组件包 : 组件.vue index.js
mkdirp(path.join(dir, component.name), (err) => {
  if (err) {
    console.warn(chalk.red(err));
  } else {
    utils.writeFileOrWarn(path.resolve(__dirname, '../packages/' + component.name + "/index.js"), indexJS(component));
    mkdirp(path.join(dir, component.name, "src"), (err) => {
      utils.writeFileOrWarn(path.resolve(__dirname, '../packages/' + component.name + "/src/" + component.name + ".vue"), indexVue(component));
    })
  }
});

//theme-chalk 增加 组件对应样式
mkdirp(path.join(cssDir, 'src'), (err) => {
  if (err) {
    console.warn(chalk.red(err));
  } else {
    utils.writeFileOrWarn(path.join(cssDir, 'src', component.name + '.scss'), '');
    utils.appendFile(path.join(cssDir, 'src', 'index.scss'), updateIndexScss(component));
  }
});

//component.json 写入组件
let componentJsonPath = path.resolve(__dirname, "../components.json");
fs.readFile(componentJsonPath, 'utf-8', function (err, data) {
  let list1 = data.split('\n');
  let str1 = ''; //之前的str
  list1.forEach((item, index) => {
    if (item == "}") {
      list1[index - 1] = list1[index - 1] + ",";//给上一行加上逗号
      str1 = list1.slice(0, index).join("\n");
    }
  });
  let str = '\n\t"' + component.name + '":"./packages/' + component.name + '/index.js"';
  let newData = str1 + str + "\n" + "}";
  fs.writeFile(componentJsonPath, newData, err => {
    if (err) {
      console.log(err);
    }
  });
})
