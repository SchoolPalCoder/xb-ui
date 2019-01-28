const path = require("path");
const baseConf = require("./webpack.base");
const merge = require("webpack-merge");
const config = require("./config");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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

const resolve = (pathStr) => {
  return path.resolve(process.cwd(), pathStr);
};

console.log("run at http://127.0.0.1:8086");

module.exports = merge(baseConf, {
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
    path: resolve("./examples/dist/"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".vue", ".json", ".ts"],
    alias: {
      examples: resolve("./examples"),
      docs: resolve("./examples/docs"),
      guide: resolve("./examples/docs/guide"),
      components: resolve("./examples/docs/components"),
    },
    modules: ["node_modules"],
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader?minimize=false",
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"],
      },
      {
        test: /\.md$/,
        include: [resolve("./examples/docs")],
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./examples/index.html",
      filename: "./index.html",
      favicon: "./examples/favicon.ico",
    }),
  ],
});
