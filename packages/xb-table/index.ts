import { PluginObject } from "vue";
import XbTable from "./src/xb-table.vue";
export default XbTable;

export const xbTable: PluginObject<XbTable> = {
  install: (Vue) => {
    Vue.component("XbTable", XbTable);
  },
};
