/**
 * npm run create:component 组件名
 */
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const utils = require('./utils');

// package/组件/index.js
var indexJS = (component) => {
  let componentName = component.name.substring(0, 1).toUpperCase() + component.name.substring(1);
  return `
    import Xb${componentName} from './index.vue';

    Xb${componentName}.install = function (Vue) {
      Vue.component(Xb${componentName}.name, Xb${componentName});
    };

    export default Xb${componentName};
  `;
}

// package/组件/index.vue
var indexVue = (component) => {
  let componentName = component.name.substring(0, 1).toUpperCase() + component.name.substring(1);
  return `
    <template>

    </template>

    <script>
    export default {
      name: 'Xb${componentName}',
    };
    </script>
  `;
}

// package/theme-chalk/index.scss update
var updateIndexScss = (component) => {
  return `@import "./${component.name}.scss";\n`
}

var component = {
  name: process.argv[2].toLowerCase(),
}

let dir = path.resolve(__dirname, '../packages');
let cssDir = path.resolve(__dirname, '../packages/theme-chalk');

//packages 增加对应组件包 ：index.vue index.js
mkdirp(path.join(dir, component.name), (err) => {
  if (err) {
    console.warn(chalk.red(err));
  } else {
    utils.writeFileOrWarn(path.join(dir, component.name, 'index.js'), indexJS(component));
    utils.writeFileOrWarn(path.join(dir, component.name, 'index.vue'), indexVue(component));
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
  let dataList = data.split('}');
  let str = '\n\t"' + component.name + '":"./packages/' + component.name + '/index.js"';
  let newData = str1 + str + dataList[1] + "}";
  fs.writeFile(componentJsonPath, newData, err => {
    if (err) {
      console.log(err);
    }
  });
})
