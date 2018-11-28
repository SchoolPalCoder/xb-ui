import { PluginObject } from "vue";
import XbFormItem from "./src/xb-form-item.vue";
export default XbFormItem;

export const xbFormItem: PluginObject<XbFormItem> = {
  install: (Vue) => {
    Vue.component("XbFormItem", XbFormItem);
  },
};
