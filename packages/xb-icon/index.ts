import { PluginObject } from "vue";
import XbIcon from "./src/xb-icon.vue";

export default XbIcon;

export const xbIcon: PluginObject<XbIcon> = {
    install: (Vue) => {
        Vue.component("XbIcon", XbIcon);
    },
};
