const path = require("path");
const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "production",
  entry: {
    app: "./src/index.ts",
  },
  output: {
    path: path.resolve(process.cwd(), "./lib"),
    publicPath: "/lib/",
    filename: "xb-ui.common.js",
    chunkFilename: "[id].js",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".js", ".vue", ".json", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "../packages"),
      main: path.resolve(__dirname, "../src"),
      examples: path.resolve(__dirname, "../examples"),
      docs: path.resolve(__dirname, "../examples/docs"),
      guide: path.resolve(__dirname, "../examples/docs/guide"),
      components: path.resolve(__dirname, "../examples/docs/components"),
      src: path.resolve(__dirname, "../src"),
    },
    modules: ["node_modules"],
  },
  externals: { vue: "ue" },
  module: {
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
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          preserveWhitespace: false,
          ts: "ts-loader",
        },
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
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
