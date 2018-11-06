const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

//component.json 写入组件
const componentJsonPath = path.resolve(__dirname, "../components.json");
fs.readFile(componentJsonPath, "utf-8", (error, data) => {});
