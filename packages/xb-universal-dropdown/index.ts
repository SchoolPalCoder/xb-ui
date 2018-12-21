import { PluginObject } from "vue";
import XbUniversalDropdown from "./src/xb-universal-dropdown.vue";
export default XbUniversalDropdown;

export const xbUniversalDropdown: PluginObject<XbUniversalDropdown> = {
  install: (Vue) => {
    Vue.component("XbUniversalDropdown", XbUniversalDropdown);
  },
};
