import { PluginObject } from "vue";
import XbText from "./src/xb-text.vue";
export default XbText;

export const xbText: PluginObject<XbText> = {
  install: (Vue) => {
    Vue.component("XbText", XbText);
  },
};
