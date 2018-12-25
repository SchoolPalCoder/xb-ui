import { PluginObject } from "vue";
import XbLocation from "./src/xb-location.vue";

export default XbLocation;

export const xbLocation: PluginObject<XbLocation> = {
  install: (Vue) => {
    Vue.component("XbLocation", XbLocation);
  },
};
