import { hasOwn } from "../utils/utils";

const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */
export default () => {
  /**
   * template
   *
   * @param {String} str
   * @param {Array} ...args
   * @return {String}
   */
  function template(str: string, ...args: any[] | any) {
    if (args.length === 1 && typeof args[0] === "object") {
      args = args[0];
    }

    if (!args || !args.hasOwnProperty) {
      args = {};
    }

    return str.replace(RE_NARGS, (match, prefix, i, index) => {
      let result;

      if (str[index - 1] === "{" && str[index + match.length] === "}") {
        return i;
      } else {
        result = hasOwn(args, i) ? args[i] : null;
        if (result === null || result === undefined) {
          return "";
        }

        return result;
      }
    });
  }

  return template;
};
