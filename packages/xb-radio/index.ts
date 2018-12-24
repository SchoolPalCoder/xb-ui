import { PluginObject } from "vue";
import XbRadio from "./src/xb-radio.vue";
export default XbRadio;

export const xbRadio: PluginObject<XbRadio> = {
  install: (Vue) => {
    Vue.component("XbRadio", XbRadio);
  },
};
