const mdUtils = require("./md-utils");
const stringReplace = require("./string-replace");
const readDirSync = require("./read-dir-sync");
const lodash = require("lodash");

const upperCamelCase = (name) => {
  const camelCase = lodash.camelCase(name);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

module.exports = {
  mdUtils,
  stringReplace,
  readDirSync,
  upperCamelCase,
};
