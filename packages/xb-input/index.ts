import { PluginObject } from "vue";
import XbInput from "./src/xb-input.vue";
export default XbInput;

export const xbInput: PluginObject<XbInput> = {
  install: (Vue) => {
    Vue.component("XbInput", XbInput);
  },
};
