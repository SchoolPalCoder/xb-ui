/**
 * npm run create:component 组件名
 */
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const utils = require('./utils');

const component = {
  lowerName: process.argv[2].toLowerCase(),
  pascalName: utils.pascalCase(process.argv[2])
}

// package/组件/index.js
const indexJS = (component) => {
  return `
    import ${component.pascalName} from './src/${component.lowerName}.vue';

    ${component.pascalName}.install = function (Vue) {
      Vue.component(${component.pascalName}.name, ${component.pascalName});
    };

    export default ${component.pascalName};
  `;
}

// package/组件/src/组件.vue
const indexVue = (component) => {
  return `
    <template>

    </template>

    <script>
    export default {
      name: '${component.pascalName}',
    };
    </script>
  `;
}

// package/theme-chalk/index.scss update
const updateIndexScss = (component) => {
  return `@import "./${component.lowerName}.scss";\n`
}

let dir = path.resolve(__dirname, '../packages');
let cssDir = path.resolve(__dirname, '../packages/theme-chalk');

//packages 增加对应组件包 : 组件.vue index.js
mkdirp(path.join(dir, component.lowerName), (err) => {
  if (err) {
    console.warn(chalk.yellow(err));
  } else {
    utils.writeFileOrWarn(path.resolve(__dirname, '../packages/' + component.lowerName + "/index.js"), indexJS(component));
    mkdirp(path.join(dir, component.lowerName, "src"), (err) => {
      utils.writeFileOrWarn(path.resolve(__dirname, '../packages/' + component.lowerName + "/src/" + component.lowerName + ".vue"), indexVue(component));
    })
  }
});

//theme-chalk 增加 组件对应样式
mkdirp(path.join(cssDir, 'src'), (err) => {
  if (err) {
    console.warn(chalk.red(err));
  } else {
    utils.writeFileOrWarn(path.join(cssDir, 'src', component.lowerName + '.scss'), '');
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
      list1[index - 1] = list1[index - 1] + ","; //给上一行加上逗号
      str1 = list1.slice(0, index).join("\n");
    }
  });
  let str = '\n\t"' + component.lowerName + '":"./packages/' + component.lowerName + '/index.js"';
  let newData = str1 + str + "\n" + "}";
  fs.writeFile(componentJsonPath, newData, err => {
    if (err) {
      console.log(err);
    }
  });
})
