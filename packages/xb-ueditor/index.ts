import { PluginObject } from "vue";
import XbUeditor from "./src/xb-ueditor.vue";

export default XbUeditor;

export const xbUeditor: PluginObject<XbUeditor> = {
    install: (Vue) => {
        Vue.component("XbUeditor", XbUeditor);
    },
};
