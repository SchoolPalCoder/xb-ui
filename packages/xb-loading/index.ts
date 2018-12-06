import { PluginObject } from "vue";
import XbLoading from "./src/xb-loading.vue";

export default XbLoading;

export const xbLoading: PluginObject<XbLoading> = {
    install: (Vue) => {
        Vue.component("XbLoading", XbLoading);
    },
};
