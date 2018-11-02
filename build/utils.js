"use strict";

/**
 * 增加 hljs 的 classname
 */
exports.wrapCustomClass = function(render) {
  return function(...args) {
    return render(...args)
      .replace('<code class="', '<code class="hljs ')
      .replace("<code>", '<code class="hljs">');
  };
};

/**
 * Format HTML string
 */
exports.convertHtml = function(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, "$2"), 16));
  });
  return str;
};
