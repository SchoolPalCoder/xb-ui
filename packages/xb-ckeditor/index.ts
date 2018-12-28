import { PluginObject } from "vue";
import XbCkeditor from "./src/xb-ckeditor.vue";
export default XbCkeditor;

export const xbCkeditor: PluginObject<XbCkeditor> = {
  install: (Vue) => {
    Vue.component("XbCkeditor", XbCkeditor);
  },
};
