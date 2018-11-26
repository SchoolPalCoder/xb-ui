import { PluginObject } from "vue";
import XbCheckboxGroup from "@/xb-checkbox/src/xb-checkbox-group.vue";
export default XbCheckboxGroup;

export const xbCheckboxGroup: PluginObject<XbCheckboxGroup> = {
  install: (Vue) => {
    Vue.component("XbCheckboxGroup", XbCheckboxGroup);
  },
};
