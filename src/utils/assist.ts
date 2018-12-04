import Vue from "vue";
import { upperFirst } from "lodash";
const isServer = Vue.prototype.$isServer;

export function camelcaseToHyphen(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

// For Modal scrollBar hidden
let cached: number | undefined;
export function getScrollBarSize(fresh: boolean): number {
  if (isServer) {
    return 0;
  }
  if (fresh || cached === undefined) {
    const inner = document.createElement("div");
    inner.style.width = "100%";
    inner.style.height = "200px";

    const outer = document.createElement("div");
    const outerStyle = outer.style;

    outerStyle.position = "absolute";
    outerStyle.top = "0";
    outerStyle.left = "0";
    outerStyle.pointerEvents = "none";
    outerStyle.visibility = "hidden";
    outerStyle.width = "200px";
    outerStyle.height = "150px";
    outerStyle.overflow = "hidden";

    outer.appendChild(inner);

    document.body.appendChild(outer);

    const widthContained = inner.offsetWidth;
    outer.style.overflow = "scroll";
    let widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);

    cached = widthContained - widthScroll;
  }
  return cached;
}

// watch DOM change
export const MutationObserver = isServer
  ? false
  : window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || false;

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

function camelCase(name) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    })
    .replace(MOZ_HACK_REGEXP, "Moz$1");
}

/** 获取指定元素上的样式 */
export function getStyle(element: HTMLElement, styleName: string): string {
  if (!element || !styleName) {
    return "";
  }
  styleName = camelCase(styleName);
  if (styleName === "float") {
    styleName = "cssFloat";
  }
  try {
    const computed: CSSStyleDeclaration = window.getComputedStyle(element, "");
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
}

// 警告
export function warnProp(component, prop, correctType, wrongType) {
  correctType = upperFirst(correctType);
  wrongType = upperFirst(wrongType);
  // tslint:disable-next-line:no-console
  console.error(
    // tslint:disable-next-line:max-line-length
    `[XBUI warn]: Invalid prop: type check failed for prop ${prop}. Expected ${correctType}, got ${wrongType}. (found in component: ${component})`
  );
}

// scrollTop animation
export function scrollTop(el, from = 0, to, duration = 500): void {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
  }
  const difference = Math.abs(from - to);
  const steps = Math.ceil((difference / duration) * 50);

  function scroll(start, end, step) {
    if (start === end) {
      return;
    }

    let d = start + step > end ? end : start + step;
    if (start > end) {
      d = start - step < end ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }
  scroll(from, to, steps);
}

/** 根据组件名称，往上寻找父级组件,返回最先找到的父组件Vue实例 */
export function findComponentUpward(context: Vue, componentName: string): Vue {
  let parent = context.$parent;
  let name = parent.$options.name;

  while (parent && (!name || parent.$options.name !== componentName)) {
    parent = parent.$parent;
    if (parent) {
      name = parent.$options.name;
    }
  }
  return parent;
}

// Find component downward
export function findComponentDownward(context: Vue, componentName: string) {
  const childrens = context.$children;
  let children: Vue | undefined;

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name;
      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) {
          break;
        }
      }
    }
  }
  return children;
}

/**  根据组件名称，往下寻找所有子级组件 */
export function findComponentsDownward(context: Vue, componentName: string): Vue[] {
  return context.$children.reduce(
    (components, child) => {
      if (child.$options.name === componentName) {
        components.push(child);
      }
      const foundChilds = findComponentsDownward(child, componentName);
      return components.concat(foundChilds);
    },
    [] as Vue[]
  );
}

// Find components upward
export function findComponentsUpward(context: Vue, componentName: string): Vue[] {
  const parents: Vue[] = [];
  const parent = context.$parent;
  if (parent) {
    if (parent.$options.name === componentName) {
      parents.push(parent);
    }
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
}

// Find brothers components
export function findBrothersComponents(context: Vue, componentName: string, exceptMe: boolean = true) {
  const res = context.$parent.$children.filter((item) => {
    return item.$options.name === componentName;
  });
  const index = res.findIndex((item) => item._uid === context._uid);
  if (exceptMe) {
    res.splice(index, 1);
  }
  return res;
}

/* istanbul ignore next */
const trim = function(str: string) {
  return (str || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
};

/* istanbul ignore next */
export function hasClass(el, cls) {
  if (!el || !cls) {
    return false;
  }
  if (cls.indexOf(" ") !== -1) {
    throw new Error("className should not contain space.");
  }
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}

/* istanbul ignore next */
export function addClass(el, cls) {
  if (!el) {
    return;
  }
  let curClass = el.className;
  const classes = (cls || "").split(" ");

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) {
      continue;
    }

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += " " + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/* istanbul ignore next */
export function removeClass(el, cls) {
  if (!el || !cls) {
    return;
  }
  const classes = cls.split(" ");
  let curClass = " " + el.className + " ";

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) {
      continue;
    }

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(" " + clsName + " ", " ");
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

export const dimensionMap = {
  xs: "480px",
  sm: "768px",
  md: "992px",
  lg: "1200px",
  xl: "1600px",
};
