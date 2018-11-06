const fs = require("fs");
const lodash = require("lodash");
const chalk = require("chalk");

const writeFileOrWarn = (file, data) => {
  if (fs.existsSync(file)) {
    console.error(chalk.bgRed(`warn:${file} already exists!`));
  } else {
    fs.writeFileSync(file, data);
  }
};

// 转为帕斯卡命名
const toPascalName = (name) => {
  return lodash.upperFirst(lodash.camelCase(name));
};

const appendFile = (file, data) => {
  fs.appendFile(file, data, (err) => {
    if (err) {
      // 读文件是不存在报错
      // 意外错误
      // 文件权限问题
      // 文件夹找不到(不会自动创建文件夹)
      console.error(chalk.bgRed(err));
    }
  });
};

module.exports = {
  toPascalName,
  writeFileOrWarn,
  appendFile,
};
