import { PluginObject } from "vue";
import XbForm from "./src/xb-form.vue";
export default XbForm;

export const xbForm: PluginObject<XbForm> = {
  install: (Vue) => {
    Vue.component("XbForm", XbForm);
  },
};
