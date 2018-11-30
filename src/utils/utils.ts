import Vue from "vue";

const isServer = Vue.prototype.$isServer;

/** 确定对象是否具有指定名称的属性。 */
export function hasOwn(obj, key): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/* istanbul ignore next */
export const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(element: HTMLElement, event: string, handler: EventListenerOrEventListenerObject) {
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
    return function(element: HTMLElement, event: string, handler: EventListenerOrEventListenerObject) {
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
