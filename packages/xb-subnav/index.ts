import { PluginObject } from "vue";
import XbSubnav from "./src/xb-subnav.vue";
export default XbSubnav;

export const xbSubnav: PluginObject<XbSubnav> = {
  install: (Vue) => {
    Vue.component("XbSubnav", XbSubnav);
  },
};
