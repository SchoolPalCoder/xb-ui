const path = require("path");
const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MarkdownItContainer = require("markdown-it-container");
const stripTags = require("./strip-tags");
const vueLoaderConfig = require("./vue-loader.conf");
const utils = require("./utils");

const vueMarkdown = {
  preprocess: (MarkdownIt, source) => {
    MarkdownIt.renderer.rules.table_open = function() {
      return '<table class="table">';
    };
    MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence);

    const code_inline = MarkdownIt.renderer.rules.code_inline;
    MarkdownIt.renderer.rules.code_inline = function(...args) {
      args[0][args[1]].attrJoin("class", "code_inline");
      return code_inline(...args);
    };
    return source;
  },
  use: [
    [
      MarkdownItContainer,
      "demo",
      {
        validate: (params) => params.trim().match(/^demo\s*(.*)$/),
        render: function(tokens, idx) {
          if (tokens[idx].nesting === 1) {
            const html = utils.convertHtml(stripTags(tokens[idx + 1].content, "script"));
            // 移除描述，防止被添加到代码块
            tokens[idx + 2].children = [];

            return `<demo-block>
                        <div slot="desc">${html}</div>
                        <div slot="highlight">`;
          }
          return "</div></demo-block>\n";
        },
      },
    ],
  ],
};

const webpackConfig = {
  mode: "development",
  entry: {
    app: "./examples/main.ts",
  },
  devServer: {
    host: "127.0.0.1",
    port: 8086,
    open: true,
    inline: true,
    publicPath: "/",
    noInfo: true,
    historyApiFallback: true,
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
      "$/": path.resolve(__dirname, "../examples"),
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
            options: {
              raw: true,
            },
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
        use: ["vue-style-loader", "css-loader", "less-loader"],
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
    new HtmlWebpackPlugin({
      template: "./examples/index.html",
      filename: "./index.html",
      favicon: "./examples/favicon.ico",
    }),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
  ],
};

module.exports = webpackConfig;
