import defaultLang from "./lang/zh-CN";
import Vue from "vue";
import deepmerge from "deepmerge";
import Format from "./format";

const format = Format();
let lang = defaultLang as object;
let merged = false;

let i18nHandler = function(this: Vue): string | object | undefined {
  // 查看Vue的原型上是否有$t，有说明采用了i18n的东西
  const vuei18n = Object.getPrototypeOf(Vue).$t;
  if (typeof vuei18n === "function" && !!Vue.locale) {
    if (!merged) {
      merged = true;
      Vue.locale(Vue.config.lang, deepmerge(lang, Vue.locale(Vue.config.lang) || {}, { clone: true }));
    }
    return vuei18n.apply(this, arguments);
  }
};

export const t = function(this, path: string, options: any[] | any): string {
  let value = i18nHandler.apply(this, arguments as any);
  if (value !== null && value !== undefined) {
    return value as string;
  }

  const array = path.split(".");
  let current = lang;

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property] as string | object;
    if (i === j - 1) {
      return format(value as string, options);
    }
    if (!value) {
      return "";
    }
    current = value as object;
  }
  return "";
};

export const use = function(l) {
  lang = l || lang;
};

export const i18n = function(fn: any) {
  i18nHandler = fn || i18nHandler;
};

export default { use, t, i18n };
