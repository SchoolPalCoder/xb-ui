import { PluginObject } from "vue";
import XbCheckbox from "./src/xb-checkbox.vue";
export default XbCheckbox;

export const xbCheckbox: PluginObject<XbCheckbox> = {
  install: (Vue) => {
    Vue.component("XbCheckbox", XbCheckbox);
  },
};