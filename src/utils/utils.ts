import Vue from "vue";

const isServer = Vue.prototype.$isServer;

/** 确定对象是否具有指定名称的属性。 */
export function hasOwn(obj, key): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/* istanbul ignore next */
export const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(element: HTMLElement | Window, event: string, handler: EventListenerOrEventListenerObject) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();

/* istanbul ignore next */
export const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(element: HTMLElement | Window, event: string, handler: EventListenerOrEventListenerObject) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent("on" + event, handler);
      }
    };
  }
})();

/**
 * 并联加载指定的脚本
 * 并联加载[同步]同时加载，不管上个是否加载完成，直接加载全部
 * 全部加载完成后执行回调
 * @param array|string 指定的脚本们
 * @param function 成功后回调的函数
 * @return array 所有生成的脚本元素对象数组
 */
export function parallelLoadScripts(scripts: string[], callback: () => void) {
  if (typeof(scripts) !== "object") {
    scripts = [scripts];
  }
  const HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
  const s = new Array();
  let loaded = 0;
  for (let i = 0; i < scripts.length; i++) {
    s[i] = document.createElement("script");
    s[i].setAttribute("type", "text/javascript");
    // Attach handlers for all browsers
    s[i].onload = s[i].onreadystatechange = function() {
      if (!0 || this.readyState === "loaded" || this.readyState === "complete") {
        loaded++;
        this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this);
        if (loaded === scripts.length && typeof (callback) === "function") {
          callback();
        }
      }
    };
    s[i].setAttribute("src", scripts[i]);
    if (HEAD) {
      HEAD.appendChild(s[i]);
    }
  }
}

/**
 * 串联加载指定的脚本
 * 串联加载[异步]逐个加载，每个加载完成后加载下一个
 * 全部加载完成后执行回调
 * @param array|string 指定的脚本们
 * @param function 成功后回调的函数
 * @return array 所有生成的脚本元素对象数组
 */
export function seriesLoadScripts(scripts: string[], callback: () => void) {
  if (typeof(scripts) !== "object") {
    scripts = [scripts];
  }
  const HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
  const s = new Array();
  const last = scripts.length - 1;
  const recursiveLoad = function(i) {
    // 递归
    s[i] = document.createElement("script");
    s[i].setAttribute("type", "text/javascript");
    s[i].onload = s[i].onreadystatechange = function() {
      // Attach handlers for all browsers
      if (!0 || this.readyState === "loaded" || this.readyState === "complete") {
        this.onload = this.onreadystatechange = null;
        this.parentNode.removeChild(this);
        if (i !== last){
          recursiveLoad(i + 1);
        } else if (typeof(callback) === "function") {
          callback();
        }
      }
    };
    console.log(scripts[i]);
    s[i].setAttribute("src", scripts[i]);

    if (HEAD) {
      HEAD.appendChild(s[i]);
      console.log('js代码');
      console.log(HEAD);
    }

  };
  recursiveLoad(0);
}
