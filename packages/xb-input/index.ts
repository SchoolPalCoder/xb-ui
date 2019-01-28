import { PluginObject } from "vue";
import XbInput from "./src/xb-input.vue";
export default XbInput;

export const xbText: PluginObject<XbInput> = {
  install: (Vue) => {
    Vue.component("XbText", XbInput);
  },
};
