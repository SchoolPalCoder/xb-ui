const path = require("path");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.base");

const MarkdownItContainer = require("markdown-it-container");
const stripTags = require("./strip-tags");
const utils = require("./utils");

const vueMarkdown = {
    preprocess: (MarkdownIt, source) => {
        MarkdownIt.renderer.rules.table_open = function() {
            return '<table class="table">';
        };
        MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence);

        // ```html `` 给这种样式加个class hljs
        //  但是markdown-it 有个bug fence整合attr的时候直接加载class数组上而不是class的值上
        //  markdown-it\lib\renderer.js 71行 这么修改可以修复bug
        //  tmpAttrs[i] += ' ' + options.langPrefix + langName; --> tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
        // const fence = MarkdownIt.renderer.rules.fence
        // MarkdownIt.renderer.rules.fence = function(...args){
        //   args[0][args[1]].attrJoin('class', 'hljs')
        //   var a = fence(...args)
        //   return a
        // }

        // ```code`` 给这种样式加个class code_inline
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

module.exports = () => {
    return webpackMerge(baseConfig({ mode: "development", entry: "./examples/main.ts" }), {
        module: {
            rules: [
                {
                    test: /\.md$/,
                    loader: "vue-markdown-loader",
                    options: vueMarkdown,
                },
            ],
        },
    });
};
