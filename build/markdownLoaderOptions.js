const striptags = require("./strip-tags");
const vueMarkdown = {
  preprocess: (MarkdownIt, source) => {
    MarkdownIt.renderer.rules.table_open = function() {
      return '<table class="table">';
    };
    MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence);

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
      require("markdown-it-container"),
      "demo",
      {
        validate: (params) => params.trim().match(/^demo\s*(.*)$/),
        render: function(tokens, idx) {
          var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
          if (tokens[idx].nesting === 1) {
            var desc = tokens[idx + 2].content;
            const html = utils.convertHtml(striptags(tokens[idx + 1].content, "script"));
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
    [require("markdown-it-container"), "tip"],
    /* or */
    [require("markdown-it-container"), "warning"],
  ],
};
exports.vueMarkdown = vueMarkdown;
