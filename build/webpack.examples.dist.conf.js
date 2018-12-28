const path = require("path");
const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpackConfig = {
  mode: "production",
  entry: {
    app: "./examples/main.ts",
  },
  devtool: "inline-source-map",
  output: {
    path: path.resolve(process.cwd(), "./examples/dist/"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".vue", ".json", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "../packages"),
      examples: path.resolve(__dirname, "../examples"),
      docs: path.resolve(__dirname, "../examples/docs"),
      guide: path.resolve(__dirname, "../examples/docs/guide"),
      components: path.resolve(__dirname, "../examples/docs/components"),
      src: path.resolve(__dirname, "../src"),
    },
    modules: ["node_modules"],
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              appendTsSuffixTo: ["\\.vue$"],
            },
          },
        ],
      },
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "vue-loader",
          },
          {
            loader: "vue-markdown-loader/lib/markdown-compiler",
            options: { raw: true },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          preserveWhitespace: false,
          ts: "ts-loader",
        },
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        type: "javascript/auto",
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
    new HtmlWebpackPlugin({
      template: "./examples/index.html",
      filename: "./index.html",
      favicon: "./examples/favicon.ico",
    }),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, "../static/"),
        to:path.resolve(__dirname, "../examples/dist/static/")
  }])
  ],
};

module.exports = webpackConfig;
