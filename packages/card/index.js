import XbCard from './card.vue';

XbCard.install = function(Vue) {
  Vue.component(XbCard.name, XbCard);
};

export default XbCard;
