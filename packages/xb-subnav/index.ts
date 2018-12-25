import { PluginObject } from "vue";
import XbSubnav from "../xb-nav/src/xb-subnav.vue";
export default XbSubnav;

export const xbSubnav: PluginObject<XbSubnav> = {
  install: (Vue) => {
    Vue.component("XbSubnav", XbSubnav);
  },
};
