import { PluginObject } from "vue";
import XbButton from "./src/xb-button.vue";
export default XbButton;

export const xbButton: PluginObject<XbButton> = {
  install: (Vue) => {
    Vue.component("XbButton", XbButton);
  },
};
