import XbAlert from './src/xb-alert.vue';

XbAlert.install = function (Vue) {
  Vue.component(XbAlert.name, XbAlert);
};

export default XbAlert;
