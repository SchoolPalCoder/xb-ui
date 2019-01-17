const path = require("path");
const fs = require("fs");
const nodeExternals = require("webpack-node-externals");
const Components = require("../components.json");
const utilsList = fs.readdirSync(path.resolve(__dirname, "../src/utils"));
const externals = {};

Object.keys(Components).forEach((key) => {
  externals[`xb-ui/packages/${key}`] = `xb-ui/lib/${key}`;
});

externals["xb-ui/src/locale"] = "xb-ui/lib/locale";
utilsList.forEach(function(file) {
  file = path.basename(file, ".ts");
  externals[`xb-ui/src/utils/${file}`] = `xb-ui/lib/utils/${file}`;
});

const newExternals = [
  Object.assign(externals, {
    vue: "vue",
  }),
  nodeExternals(),
];

exports.externals = newExternals;

exports.alias = {
  "@": path.resolve(__dirname, "../packages"),
  src: path.resolve(__dirname, "../src"),
};

exports.vue = {
  root: "Vue",
  commonjs: "vue",
  commonjs2: "vue",
  amd: "vue",
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date.\js/;
