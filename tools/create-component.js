/**
 * 自动创建组件
 * Author: SaberWang
 * CreateTime: 2018-11-03
 * Description:
 *
 */
const mkdirp = require("mkdirp");
const path = require("path");
const chalk = require("chalk");
const lodash = require("lodash");
const utils = require("./utils");

if (process.argv[2] === undefined) {
  throw new Error(chalk.bgRed("请输入组件名！"));
}

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
const indexVue = (pascalCaseName) => {
  return `<template>

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ name: "${pascalCaseName}" })
export default class ${pascalCaseName} extends Vue {

}
</script>`;
};

// package/theme-chalk/index.scss update
const updateIndexScss = (fileName) => {
  return `@import "./${fileName}.scss";\n`;
};

// 生成scss文件基础信息
const indexScss = (originName) => {
  return `@import "common/var.scss";

$${originName}-prefix: $css-prefix + "${originName}";
  `;
};

let dir = path.resolve(__dirname, "../packages");
let cssDir = path.resolve(__dirname, "../packages/theme-chalk");
//packages 增加对应组件包 : 组件.vue index.ts
mkdirp(path.join(dir, componentInfo.lowerCaseName), (err) => {
  if (err) {
    console.error(chalk.bgRed(err));
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
        indexVue(componentInfo.pascalCaseName)
      );
    });
  }
});

//theme-chalk 增加 组件对应样式
mkdirp(path.join(cssDir, "src"), (err) => {
  if (err) {
    console.error(chalk.bgRed(err));
  } else {
    utils.writeFileOrWarn(
      path.join(cssDir, "src", componentInfo.lowerCaseName + ".scss"),
      indexScss(componentInfo.lowerCaseName.substring(3))
    );
    utils.appendFile(path.join(cssDir, "src", "index.scss"), updateIndexScss(componentInfo.lowerCaseName));
  }
});
