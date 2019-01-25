const path = require("path");
const fs = require("fs");
const nodeExternals = require("webpack-node-externals");
const utils = require("./utils");
const componentFolders = utils.readDirSync(path.resolve(process.cwd(), "./packages"), /^xb-(([a-z]|-)+$)/);
const utilsList = fs.readdirSync(path.resolve(process.cwd(), "./src/utils"));
const externals = {};

componentFolders.forEach((componentName) => {
  externals[`xb-ui/packages/${componentName}`] = `xb-ui/lib/${componentName}`;
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
