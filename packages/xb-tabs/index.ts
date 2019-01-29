import { PluginObject } from "vue";
import XbTabs from "./src/xb-tabs.vue";
export default XbTabs;

export const xbTabs: PluginObject<XbTabs> = {
  install: (Vue) => {
    Vue.component("XbTabs", XbTabs);
  },
};
