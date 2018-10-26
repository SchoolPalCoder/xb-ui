const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const nodeExternals = require("webpack-node-externals");
const Components = require("../components.json");
const utilsList = fs.readdirSync(path.resolve(__dirname, "../src/utils"));

let externals = {};

Object.keys(Components).forEach((key) => {
  externals[`xb-ui/packages/${key}`] = `xb-ui/lib/${key}`;
});

utilsList.forEach((file) => {
  file = path.basename(file, ".js");
  externals[`xb-ui/src/utils/${file}`] = `xb-ui/lib/utils/${file}`;
});

externals = [
  Object.assign(
    {
      vue: "vue",
    },
    externals,
  ),
  nodeExternals(),
];

/** webpack基础配置 */
const webpackConfig = (options) => {
  return {
    output: {
      path: path.resolve(process.cwd(), "./lib"),
      publicPath: "/dist/",
      filename: "[name].js",
      chunkFilename: "[id].js",
      libraryTarget: "commonjs2",
    },
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts"],
      alias: {
        main: path.resolve(__dirname, "../src"),
        packages: path.resolve(__dirname, "../packages"),
        examples: path.resolve(__dirname, "../examples"),
        "xb-ui": path.resolve(__dirname, "../"),
      },
      modules: ["node_modules"],
    },
    externals: externals,
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          enforce: "pre",
          loader: "tslint-loader",
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
        {
          test: /\.(jsx?|babel|es6)$/,
          include: process.cwd(),
          exclude: /node_modules|utils\/popper\.js|utils\/date.\js/,
          loader: "babel-loader",
        },
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: {
            preserveWhitespace: false,
          },
        },
        {
          test: /\.json$/,
          loader: "json-loader",
        },
        {
          test: /\.html$/,
          loader: "html-loader?minimize=false",
        },
        {
          test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
          loader: "url-loader",
          query: {
            limit: 10000,
            name: path.posix.join("static", "[name].[hash:7].[ext]"),
          },
        },
        {
          test: /\.svg(\?\S*)?$/,
          loader: "url-loader",
          query: {
            limit: 10000,
            name: path.posix.join("static", "[name].[hash:7].[ext]"),
          },
        },
        {
          test: /\.(gif|png|jpe?g)(\?\S*)?$/,
          loader: "url-loader",
          query: {
            limit: 10000,
            name: path.posix.join("static", "[name].[hash:7].[ext]"),
          },
        },
      ],
    },
    plugins: [
      new ProgressBarPlugin(),
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      }),
    ],
  };
};

module.exports = webpackConfig;
