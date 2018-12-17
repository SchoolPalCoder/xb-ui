import { PluginObject } from "vue";
import XbRadioGroup from "../xb-radio/src/xb-radio-group.vue";
export default XbRadioGroup;

export const xbRadioGroup: PluginObject<XbRadioGroup> = {
  install: (Vue) => {
    Vue.component("XbRadioGroup", XbRadioGroup);
  },
};
