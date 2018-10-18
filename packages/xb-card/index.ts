import { PluginObject } from "vue";
import XbCard from "./src/xb-card.vue";

export default XbCard;

export const xbCard: PluginObject<XbCard> = {
    install: (Vue) => {
        Vue.component("XbCard", XbCard);
    },
};
