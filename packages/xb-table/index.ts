import { PluginFunction } from "vue";
import XbTable from "./src/xb-table.vue";
export { XbTable };

const install: PluginFunction<XbTable> = (Vue, options) => {
  Vue.component("XbTable", XbTable);
};

export default { install };
