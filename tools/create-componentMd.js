/**
 * 生成组件文档 并且根据vue文件中的参数生成参数表
 * npm run create:componentMd 分类文件夹名 组件名
 */
const mkdirp = require("mkdirp");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const utils = require("./utils");

const componentInfo = {
  folderName: process.argv[2].toLowerCase(),
  name: process.argv[3].toLowerCase(),
};

const folderNames = ["basic", "form", "data", "notice", "navigation", "others"];

if (!folderNames.includes(componentInfo.folderName)) {
  throw new Error(chalk.red("文档文件夹不存在！"));
}

// docs/components/组件.md
const componentMd = (component) => {
  return `# ${component.name}
----
`;
};

// 文档根目录
const dir = path.resolve(__dirname, "../examples/docs");
// 文档相对路径字符串
const mdPath = `../examples/docs/${componentInfo.folderName}/${componentInfo.name}.md`;
// 组件文档路径
const _dir = path.resolve(__dirname, mdPath);

// 创建docs/components/组件文档
const createMd = (component) => {
  mkdirp(path.join(dir, component.folderName), (err) => {
    if (err) {
      console.warn(chalk.red(err));
    } else {
      utils.writeFileOrWarn(path.join(dir, component.folderName, component.name + ".md"), componentMd(component));
    }
  });
};

//获取vue文件中的<docs></docs>内容自动生成参数表在文档上
const createParamForm = (component) => {
  const srcPath = `../packages/${component.name}/src`;
  const componentSrcPath = path.resolve(__dirname, srcPath); // src 路径
  fs.readdir(componentSrcPath, (err, files) => {
    //遍历读取src下的vue文件，将每个组件的参数都放在md文档显示
    if (err) {
      console.warn(chalk.red(err));
    } else {
      files.forEach((filename) => {
        const componentVuePath = path.resolve(__dirname, srcPath + "/" + filename);
        fs.readFile(componentVuePath, "utf-8", function(error, data) {
          //获取docs中的内容
          const reg = /<docs>([\s\S]+?)<\/docs>/;
          const paramList = data.match(reg); //注释参数
          if (paramList) {
            const str = "[^_^]:update" + paramList[1] + "\n"; //给参数表加上一个[^_^]:update注释进行标记，用于下次更新查找位置替换
            utils.appendFile(_dir, str);
          }
        });
      });
    }
  });
};

// 注意！！！ 大家文档里不要写 [^_^]:update ，这个用于查找参数表标记
// 删除参数表 [^_^]:update 之后的都替换为空 ;
const updateParamForm = (component) => {
  fs.readFile(_dir, "utf-8", function(error, data) {
    //获取原有文档中的参数表，然后将原有的参数表替换为空
    const $index = data.indexOf("[^_^]:update");
    const str = data.slice($index); //上一次的参数表
    const newData = data.replace(str, "");
    fs.writeFile(path.join(dir, component.folderName, component.name + ".md"), newData, (err) => {
      if (err) {
        throw new Error(chalk.red(err));
      }
    });
  });
};

// 更新示例站点的路由
const updateExampleRouter = (component) => {
  const jsonPath = path.join(__dirname, "../examples/router/nav.config.json");
  fs.readFile(jsonPath, "utf-8", (error, data) => {
    if (error) {
      throw new Error(chalk.red(error));
    } else {
      const findComponent = (router) => {
        return router.text === "组件";
      };
      const json = JSON.parse(data);
      const componentsHerader = json.find(findComponent);
      const componentRouter = componentsHerader.children.find(findComponent);
      const groupItem = componentRouter.groups.find((item) => {
        return item.folder === component.folderName;
      });
      const hasRouter = groupItem.list.find((i) => {
        return i.text === component.name;
      });
      if (hasRouter === undefined) {
        groupItem.list.push({ text: component.name, path: "/" + component.name });
        const newJson = JSON.stringify(json, null, 2);
        fs.writeFile(jsonPath, newJson, (err) => {
          if (err) {
            throw new Error(chalk.red(err));
          }
        });
      }
    }
  });
};

// 判断文档是否存在，如果不存在就创建，存在就只更新参数表
fs.exists(_dir, (exists) => {
  if (exists) {
    // 存在则更新参数表
    updateParamForm(componentInfo);
  } else {
    // 不存在则创建
    createMd(componentInfo);
    updateExampleRouter(componentInfo);
  }
  createParamForm(componentInfo);
});
