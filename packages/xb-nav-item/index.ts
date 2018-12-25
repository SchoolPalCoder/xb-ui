import { PluginObject } from "vue";
import XbNavItem from "../xb-nav/src/xb-nav-item.vue";
export default XbNavItem;

export const xbNavItem: PluginObject<XbNavItem> = {
  install: (Vue) => {
    Vue.component("XbNavItem", XbNavItem);
  },
};
