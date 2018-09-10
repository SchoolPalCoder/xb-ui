/**
 * 创建组件脚本工具
 * Author: SaberWang
 * CreateTime: 2018-08-31
 * Description:
 * npm run create:compoments 组件类型（md文档放哪个文件夹下） 组件名称
 */

const mkdirp = require('mkdirp');
const path = require('path');
const utils = require('./utils');
const upperFirst = require('lodash/upperFirst');

const argv = process.argv;
if (argv.length !== 3) {
  utils.console("Create component failed! Reason: argv Error!", "red");
  return
}

const createVue = (component) => {
  return `<template>

</template>

<script>
export default {
  name: "${component.name}",

  props: {

  },

  computed: {

  },

  methods: {

  }
};
</script>`;
};

const createIndex = (component) => {
  return `import ${component.name} from './${component.file}.vue';

${component.name}.install = function (Vue) {
  Vue.component(${component.name}.name, ${component.name});
};

export default ${component.name};`
};

const component = {
  name: "Xb" + upperFirst(utils.camelDashCaseTocamelCase(argv[3].toLowerCase())),
  file: argv[3].toLowerCase()
};

const componentDir = path.resolve(__dirname, "../packages"),
  scssDir = path.resolve(__dirname, "../packages/theme-chalk/src"),
  mdDir = path.resolve(__dirname, `../docs/components/${argv[2].toLowerCase()}`);

mkdirp(path.join(componentDir, component.file), (err) => {
  if (err) {
    utils.console(err, 'yellow');
  } else {
    utils.writeFileOrWarn(path.join(componentDir, component.file, `${component.file}.vue`), createVue(component));
    utils.writeFileOrWarn(path.join(componentDir, component.file, `index.js`), createIndex(component));
    utils.writeFileOrWarn(path.join(scssDir, `${component.file}.scss`), '');
    utils.writeFileOrWarn(path.join(mdDir, `${component.file}.md`), '');
    utils.console("Create component successfuly!", "green");
    console.log();
  }
});
