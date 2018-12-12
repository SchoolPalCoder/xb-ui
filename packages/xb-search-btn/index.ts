import { PluginObject } from "vue";
import XbSearchBtn from "./src/xb-search-btn.vue";
export default XbSearchBtn;

export const xbSearchBtn: PluginObject<XbSearchBtn> = {
  install: (Vue) => {
    Vue.component("XbSearchBtn", XbSearchBtn);
  },
};
