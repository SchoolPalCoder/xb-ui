import { PluginObject } from "vue";
import XbColor from "./src/xb-color.vue";
export default XbColor;

export const xbColor: PluginObject<XbColor> = {
  install: (Vue) => {
    Vue.component("XbColor", XbColor);
  },
};
