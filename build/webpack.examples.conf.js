const path = require("path");
const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// const MarkdownItAncher = require("markdown-it-anchor");
// const MarkdownItContainer = require("markdown-it-container");
// const stripTags = require("./strip-tags");
// const utils = require("./utils");

// const vueMarkdown = {
//   use: [
//     [
//       MarkdownItAncher,
//       {
//         level: 2,
//         // slugify: slugify,
//         permalink: true,
//         permalinkBefore: true,
//       },
//     ],
//     [
//       MarkdownItContainer,
//       "demo",
//       {
//         validate: (params) => params.trim().match(/^demo\s*(.*)$/),
//         render: function(tokens, idx) {
//           const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
//           if (tokens[idx].nesting === 1) {
//             const description = m && m.length > 1 ? m[1] : "";
//             const content = tokens[idx + 1].content;
//             const html = utils
//               .convertHtml(stripTags.strip(content, ["script", "style"]))
//               .replace(/(<[^>]*)=""(?=.*>)/g, "$1");

//             const script = striptags.fetch(content, "script");
//             const style = striptags.fetch(content, "style");
//             const jsfiddle = { html: html, script: script, style: style };
//             const descriptionHTML = description ? md.render(description) : "";

//             jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle));

//             return `<demo-block>
//                             <div class="source" slot="desc">${html}</div>
//                             ${descriptionHTML}
//                             <div class="highlight" slot="highlight">`;
//           }
//           return "</div></demo-block>\n";
//         },
//       },
//     ],
//   ],
//   preprocess: (MarkdownIt, source) => {
//     MarkdownIt.renderer.rules.table_open = function() {
//       return '<table class="table">';
//     };
//     MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence);

//     let code_inline = MarkdownIt.renderer.rules.code_inline;
//     MarkdownIt.renderer.rules.code_inline = function(...args) {
//       args[0][args[1]].attrJoin("class", "code_inline");
//       return code_inline(...args);
//     };
//     return source;
//   },
// };

console.log("run at http://127.0.0.1:8086");

const webpackConfig = {
  mode: "development",
  entry: {
    app: "./examples/main.ts",
  },
  devServer: {
    host: "127.0.0.1",
    port: 8086,
    inline: true,
    publicPath: "/",
    noInfo: true,
    historyApiFallback: true,
    open: true,
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
  ],
};

module.exports = webpackConfig;
