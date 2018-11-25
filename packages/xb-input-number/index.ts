import { PluginObject } from "vue";
import XbInputNumber from "./src/xb-input-number.vue";
export default XbInputNumber;

export const xbInputNumber: PluginObject<XbInputNumber> = {
  install: (Vue) => {
    Vue.component("XbInputNumber", XbInputNumber);
  },
};