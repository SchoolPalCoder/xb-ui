const fs = require("fs");
const upperFirst = require('lodash/upperFirst');

const colors = {
  'bold': ['\x1B[1m', '\x1B[22m'],
  'italic': ['\x1B[3m', '\x1B[23m'],
  'underline': ['\x1B[4m', '\x1B[24m'],
  'inverse': ['\x1B[7m', '\x1B[27m'],
  'strikethrough': ['\x1B[9m', '\x1B[29m'],
  'white': ['\x1B[37m', '\x1B[39m'],
  'grey': ['\x1B[90m', '\x1B[39m'],
  'black': ['\x1B[30m', '\x1B[39m'],
  'blue': ['\x1B[34m', '\x1B[39m'],
  'cyan': ['\x1B[36m', '\x1B[39m'],
  'green': ['\x1B[32m', '\x1B[39m'],
  'magenta': ['\x1B[35m', '\x1B[39m'],
  'red': ['\x1B[31m', '\x1B[39m'],
  'yellow': ['\x1B[33m', '\x1B[39m'],
  'whiteBG': ['\x1B[47m', '\x1B[49m'],
  'greyBG': ['\x1B[49;5;8m', '\x1B[49m'],
  'blackBG': ['\x1B[40m', '\x1B[49m'],
  'blueBG': ['\x1B[44m', '\x1B[49m'],
  'cyanBG': ['\x1B[46m', '\x1B[49m'],
  'greenBG': ['\x1B[42m', '\x1B[49m'],
  'magentaBG': ['\x1B[45m', '\x1B[49m'],
  'redBG': ['\x1B[41m', '\x1B[49m'],
  'yellowBG': ['\x1B[43m', '\x1B[49m']
};

const _console = (text, color) => {
  const style = colors[color];
  if (style) {
    console.log(style.join(text));
  } else {
    console.log(text);
  }
};


const writeFileOrWarn = (file, data) => {
  if (fs.existsSync(file)) {
    _console(`warn:${file} already exists!`, 'yellow');
  } else {
    fs.writeFileSync(file, data);
  }
};

const camelDashCaseTocamelCase = (name) => {
  return name
    .split('-')
    .map((name, index) => index === 0 ? name : upperFirst(name))
    .join('');
}

const appendFile = (file, data) => {
  fs.appendFile(file, data, (err) => {
    if (err) {
      // 读文件是不存在报错
      // 意外错误
      // 文件权限问题
      // 文件夹找不到(不会自动创建文件夹)
      console.log(err);
    }
  });
}

module.exports = {
  camelDashCaseTocamelCase,
  writeFileOrWarn,
  appendFile,
  console: _console
};
