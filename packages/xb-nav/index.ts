import { PluginObject } from "vue";
import XbNav from "./src/xb-nav.vue";
export default XbNav;

export const xbNav: PluginObject<XbNav> = {
  install: (Vue) => {
    Vue.component("XbNav", XbNav);
  },
};
