import { PluginFunction } from "vue";
import XbTable from "./src/xb-table.vue";
export default  XbTable ;

export const install: PluginFunction<XbTable> = (Vue, options) => {
  Vue.component("XbTable", XbTable);
};

