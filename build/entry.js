import XbButton from '../packages/xb-button/index.js';
import XbCard from '../packages/xb-card/index.js';
import XbAlert from '../packages/xb-alert/index.js';
import XbIcon from '../packages/xb-icon/index.js';
import locale from '../src/locale';

const components = [XbButton, XbCard, XbAlert, XbIcon];

const install = function (Vue, opts = {}) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000,
  };
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports = {
  version: '1.0.0',
  locale: locale.use,
  i18n: locale.i18n,
  install,
  XbButton,
  XbCard,
  XbAlert,
  XbIcon,
};

module.exports.default = module.exports;
