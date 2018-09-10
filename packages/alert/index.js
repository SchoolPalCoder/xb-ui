import XbAlert from './alert.vue';

XbAlert.install = function (Vue) {
  Vue.component(XbAlert.name, XbAlert);
};

export default XbAlert;
