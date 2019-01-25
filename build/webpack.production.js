const path = require("path");
const config = require("./config");
const baseConf = require("./webpack.base");
const webpack = require("webpack");
const merge = require("webpack-merge");
const utils = require("./utils");

const componentFolders = utils.readDirSync(path.resolve(process.cwd(), "./packages"), /^xb-(([a-z]|-)+$)/);
const entry = {};
componentFolders.forEach((componentName) => {
  entry[componentName] = `./packages/${componentName}/index.ts`;
});
entry["index"] = `./src/index.ts`;

module.exports = merge(baseConf, {
  mode: "production",
  entry,
  output: {
    path: path.resolve(process.cwd(), "./lib"),
    publicPath: "/lib/",
    filename: "[name].js",
    chunkFilename: "[id].js",
    libraryTarget: "commonjs2",
  },
  externals: config.externals,
  // plugins: [
  //   new webpack.DefinePlugin({
  //     "process.env.NODE_ENV": JSON.stringify("production"),
  //   }),
  //   new webpack.LoaderOptionsPlugin({
  //     minimize: true,
  //   }),
  // ],
});
