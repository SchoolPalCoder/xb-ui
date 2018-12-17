const fs = require("fs");
const path = require("path");
const Components = require("../components.json");
const themes = ["theme-chalk"];
Components = Object.keys(Components);
const basepath = path.resolve(__dirname, "../packages/");

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

themes.forEach((theme) => {
  const isLESS = theme !== "theme-default";
  const indexContent = "";
  Components.forEach(function(key) {
    const fileName = key + (isLESS ? ".less" : ".css");
    indexContent += '@import "./' + fileName + '";\n';
    const filePath = path.resolve(basepath, theme, "src", fileName);
    if (!fileExists(filePath)) {
      fs.writeFileSync(filePath, "", "utf8");
      console.log(theme, " 创建遗漏的 ", fileName, " 文件");
    }
  });
  fs.writeFileSync(path.resolve(basepath, theme, "src", isLESS ? "index.less" : "index.css"), indexContent);
});
