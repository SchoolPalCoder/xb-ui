/**
 * 自动创建组件
 * Author: SaberWang
 * CreateTime: 2018-11-03
 * Description:
 *
 */
const mkdirp = require("mkdirp");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const lodash = require("lodash");
const utils = require("./utils");

const componentInfo = {
  lowerCaseName: process.argv[2].toLowerCase(),
  camelCaseName: lodash.camelCase(process.argv[2]),
  pascalCaseName: utils.toPascalName(process.argv[2]),
};

// package/组件/index.ts
const indexTS = (component) => {
  return `import { PluginObject } from "vue";
import ${component.pascalCaseName} from "./src/${component.lowerCaseName}.vue";
export default ${component.pascalCaseName};

export const ${component.camelCaseName}: PluginObject<${component.pascalCaseName}> = {
  install: (Vue) => {
    Vue.component("${component.pascalCaseName}", ${component.pascalCaseName});
  },
};
  `;
};

// package/组件/src/组件.vue
const indexVue = (component) => {
  return `<template>

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ${component.pascalCaseName} extends Vue {

}
</script>
  `;
};

// package/theme-chalk/index.scss update
const updateIndexScss = (component) => {
  return `@import "./${component.lowerCaseName}.scss";\n`;
};

let dir = path.resolve(__dirname, "../packages");
let cssDir = path.resolve(__dirname, "../packages/theme-chalk");
//packages 增加对应组件包 : 组件.vue index.ts
mkdirp(path.join(dir, componentInfo.lowerCaseName), (err) => {
  if (err) {
    console.warn(chalk.red(err));
  } else {
    utils.writeFileOrWarn(
      path.resolve(__dirname, "../packages/" + componentInfo.lowerCaseName + "/index.ts"),
      indexTS(componentInfo)
    );
    mkdirp(path.join(dir, componentInfo.lowerCaseName, "src"), () => {
      utils.writeFileOrWarn(
        path.resolve(
          __dirname,
          "../packages/" + componentInfo.lowerCaseName + "/src/" + componentInfo.lowerCaseName + ".vue"
        ),
        indexVue(componentInfo)
      );
    });
  }
});

//theme-chalk 增加 组件对应样式
mkdirp(path.join(cssDir, "src"), (err) => {
  if (err) {
    console.warn(chalk.red(err));
  } else {
    utils.writeFileOrWarn(path.join(cssDir, "src", componentInfo.lowerCaseName + ".scss"), "");
    utils.appendFile(path.join(cssDir, "src", "index.scss"), updateIndexScss(componentInfo));
  }
});

//component.json 写入组件
const componentJsonPath = path.resolve(__dirname, "../components.json");
fs.readFile(componentJsonPath, "utf-8", function(error, data) {
  let list1 = data.split("\n");
  let str1 = ""; //之前的str
  list1.forEach((item, index) => {
    if (item == "}") {
      list1[index - 1] = list1[index - 1] + ","; //给上一行加上逗号
      str1 = list1.slice(0, index).join("\n");
    }
  });
  let str = '\n\t"' + componentInfo.lowerCaseName + '":"./packages/' + componentInfo.lowerCaseName + '/index.ts"';
  let newData = str1 + str + "\n" + "}";
  fs.writeFile(componentJsonPath, newData, (err) => {
    if (err) {
      console.error(chalk.red(err));
    }
  });
});
