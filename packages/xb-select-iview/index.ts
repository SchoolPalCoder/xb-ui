import { PluginObject } from "vue";
import XbSelect from "./src/xb-select.vue";
export default XbSelect;

export const xbSelect: PluginObject<XbSelect> = {
  install: (Vue) => {
    Vue.component("XbSelect", XbSelect);
  },
};