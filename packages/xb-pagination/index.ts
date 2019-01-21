import { PluginObject } from "vue";
import XbPagination from "./src/xb-pagination.vue";
export default XbPagination;

export const xbPagination: PluginObject<XbPagination> = {
  install: (Vue) => {
    Vue.component("XbPagination", XbPagination);
  },
};
