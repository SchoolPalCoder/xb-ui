import { PluginObject } from "vue";
import XbPoptip from "./src/xb-poptip.vue";
export default XbPoptip;

export const xbPoptip: PluginObject<XbPoptip> = {
  install: (Vue) => {
    Vue.component("XbPoptip", XbPoptip);
  },
};
