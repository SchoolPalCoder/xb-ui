/**
 * 生成组件文档 并且根据vue文件中的参数生成参数表
 * npm run create:componentMd 分类文件夹名 组件名
 */
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const utils = require('./utils');

var component = {
  fileName: process.argv[2].toLowerCase(),
  name: process.argv[3].toLowerCase()
}

// docs/components/组件.md
var componentMd = (component) => {
  return `---
sidebarDepth: 1
---

# ${component.name}
`;
}

let dir = path.resolve(__dirname, '../docs/components');
mkdirp(path.join(dir, component.fileName), (err) => {
  if (err) {
    console.warn(chalk.red(err));
  } else {
    utils.writeFileOrWarn(path.join(dir, component.fileName, component.name + '.md'), componentMd(component));
  }
});

//根据参数返回md格式的表格
// |参数名|参数说明|类型|可选值|默认值
// |:----|:---|:-----|-----|:-----
// |参数名1|参数说明1|类型1|可选值1|默认值1
var propsMD = (params) => {
  let form = `
## 参数表
|参数名|参数说明|类型|可选值|默认值
|:----|:---|:-----|-----|:-----`+ "\n"
  params.forEach(item => {
    let reg = /[^\(\)]+(?=\))/g;
    let arr = item.split("@props")[1].match(reg);
    let str = "|" + arr.join("|") + "\n";
    form = form + str;
  });
  return form;
}

//获取组件的vue文件自动生成参数表在文档上
let componentVuePath = path.resolve(__dirname, "../packages/" + component.name + "/index.vue"); //组件路径
let componentMdPath = path.resolve(__dirname, "../docs/components/" + component.fileName + "/" + component.name + ".md"); //文档路径
fs.readFile(componentVuePath, 'utf-8', function (err, data) {
  //获取<script>下export default前的注释数组，根据注释在对应的文档生成参数表
  let reg = /@props\s+([^\f\n\r\t\v]+)(?=[\f\n\r\t\v])/gm;
  let paramList = data.match(reg); //注释参数
  console.log(paramList);
  propsMD(paramList)
  utils.appendFile(componentMdPath, propsMD(paramList));
})
