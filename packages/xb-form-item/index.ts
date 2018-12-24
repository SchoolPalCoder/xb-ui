import { PluginObject } from "vue";
import XbFormItem from "../xb-form/src/xb-form-item.vue";
export default XbFormItem;

export const xbFormItem: PluginObject<XbFormItem> = {
  install: (Vue) => {
    Vue.component("XbFormItem", XbFormItem);
  },
};
