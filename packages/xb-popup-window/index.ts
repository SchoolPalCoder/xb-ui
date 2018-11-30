import { PluginObject } from "vue";
import XbPopupWindow from "./src/xb-popup-window.vue";
export default XbPopupWindow;

export const xbPopupWindow: PluginObject<XbPopupWindow> = {
  install: (Vue) => {
    Vue.component("XbPopupWindow", XbPopupWindow);
  },
};