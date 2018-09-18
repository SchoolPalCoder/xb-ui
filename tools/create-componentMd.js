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
let _dir = path.resolve(__dirname, "../docs/components/" + component.fileName + "/" + component.name + ".md"); // 组件文档路径

// 判断文档是否存在，如果不存在就创建，存在就只更新参数表
fs.exists(_dir, (exists) => {
  if (exists) { // 存在则更新参数表
    updateParamForm();
    createParamForm();
  } else { // 不存在则创建
    createMd();
    createParamForm();
  }
})

// 创建docs/components/组件文档
var createMd = () => {
  mkdirp(path.join(dir, component.fileName), (err) => {
    if (err) {
      console.warn(chalk.red(err));
    } else {
      utils.writeFileOrWarn(path.join(dir, component.fileName, component.name + '.md'), componentMd(component));
    }
  });
}


//获取vue文件中的<docs></docs>内容自动生成参数表在文档上
var createParamForm = () => {
  // let componentVuePath = path.resolve(__dirname, "../packages/" + component.name + "/src/" + component.name + ".vue"); //组件路径
  let componentSrcPath = path.resolve(__dirname, "../packages/" + component.name + "/src"); // src 路径
  let componentMdPath = path.resolve(__dirname, "../docs/components/" + component.fileName + "/" + component.name + ".md"); //文档路径
  fs.readdir(componentSrcPath, (err, files) => { //遍历读取src下的vue文件，将每个组件的参数都放在md文档显示
    if (err) {
      console.warn(chalk.red(err));
    } else {
      files.forEach((filename) => {
        let componentVuePath = path.resolve(__dirname, "../packages/" + component.name + "/src/" + filename);
        fs.readFile(componentVuePath, 'utf-8', function (err, data) {
          //获取docs中的内容
          let reg = /<docs>([\s\S]+?)<\/docs>/;
          let paramList = data.match(reg); //注释参数
          if (paramList) {
            let str = "[^_^]:update" + paramList[1] + "\n"; //给参数表加上一个[^_^]:update注释进行标记，用于下次更新查找位置替换
            utils.appendFile(componentMdPath, str);
          }
        })
      })
    }
  })
}

// 注意！！！ 大家文档里不要写 [^_^]:update ，这个用于查找参数表标记
// 删除参数表 [^_^]:update 之后的都替换为空 ;
var updateParamForm = () => {
  let componentMdPath = path.resolve(__dirname, "../docs/components/" + component.fileName + "/" + component.name + ".md"); //文档路径
  fs.readFile(componentMdPath, 'utf-8', function (err, data) {
    //获取原有文档中的参数表，然后将原有的参数表替换为空
    var $index = data.indexOf("[^_^]:update");
    var str = data.slice($index); //上一次的参数表
    var newData = data.replace(str, "");
    fs.writeFile(path.join(dir, component.fileName, component.name + '.md'), newData, (err) => {
      if (err) {
        console.warn(chalk.red(err));
      }
    });
  })
}

