const fs = require("fs");

module.exports = (pathStr, reg) => {
  const pa = fs.readdirSync(pathStr);
  const dir = [];
  pa.forEach((ele, index) => {
    const info = fs.statSync(pathStr + "/" + ele);
    if (info.isDirectory() && reg.test(ele)) {
      dir.push(ele);
    }
  });
  return dir;
};
