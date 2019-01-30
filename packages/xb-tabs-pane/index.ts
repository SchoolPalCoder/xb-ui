import { PluginObject } from "vue";
import XbTabsPane from "./src/xb-tabs-pane.vue";
export default XbTabsPane;

export const xbTabsPane: PluginObject<XbTabsPane> = {
  install: (Vue) => {
    Vue.component("XbTabsPane", XbTabsPane);
  },
};
