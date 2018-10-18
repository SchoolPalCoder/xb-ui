import { PluginObject } from "vue";
import XbAlert from "./src/xb-alert.vue";

export default XbAlert;

export const xbAlert: PluginObject<XbAlert> = {
    install: (Vue) => {
        Vue.component("XbAlert", XbAlert);
    },
};
