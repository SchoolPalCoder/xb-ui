/*
* 此代码由构建工具自动生成，请勿修改此部分代码
* 工具： '../build/bin/build-entry.js'
*/

import Vue, { VueConstructor, PluginFunction } from "vue";
import locale from "src/locale";
import XbButton from "@/xb-button/index.ts";
import XbCheckbox from "@/xb-checkbox/index.ts";
import XbCheckboxGroup from "@/xb-checkbox-group/index.ts";
import XbColor from "@/xb-color/index.ts";
import XbForm from "@/xb-form/index.ts";
import XbFormItem from "@/xb-form-item/index.ts";
import XbIcon from "@/xb-icon/index.ts";
import XbInput from "@/xb-input/index.ts";
import XbInputNumber from "@/xb-input-number/index.ts";
import XbLoading from "@/xb-loading/index.ts";
import XbMessageTips from "@/xb-message-tips/index.ts";
import XbNav from "@/xb-nav/index.ts";
import XbNavItem from "@/xb-nav-item/index.ts";
import XbPagination from "@/xb-pagination/index.ts";
import XbPoptip from "@/xb-poptip/index.ts";
import XbPopupWindow from "@/xb-popup-window/index.ts";
import XbRadio from "@/xb-radio/index.ts";
import XbRadioGroup from "@/xb-radio-group/index.ts";
import XbSearchBtn from "@/xb-search-btn/index.ts";
import XbSelect from "@/xb-select/index.ts";
import XbSubnav from "@/xb-subnav/index.ts";
import XbTable from "@/xb-table/index.ts";
import XbTabs from "@/xb-tabs/index.ts";
import XbTabsPane from "@/xb-tabs-pane/index.ts";

const components = {
  XbButton,
  XbCheckbox,
  XbCheckboxGroup,
  XbColor,
  XbForm,
  XbFormItem,
  XbIcon,
  XbInput,
  XbInputNumber,
  XbLoading,
  XbMessageTips,
  XbNav,
  XbNavItem,
  XbPagination,
  XbPoptip,
  XbPopupWindow,
  XbRadio,
  XbRadioGroup,
  XbSearchBtn,
  XbSelect,
  XbSubnav,
  XbTable,
  XbTabs,
  XbTabsPane,
};

const install: PluginFunction<any> = (vue: VueConstructor<Vue>, options: any = {}) => {
  locale.use(options.locale);
  locale.i18n(options.i18n);

  Object.keys(components).forEach((component) => {
    vue.component(component, components[component]);
  });

  vue.prototype.$XBUI = {
    size: options.size || "",
    transfer: "transfer" in options ? options.transfer : "",
  };

  vue.prototype.$Message = XbMessageTips;
};

module.exports = {
  version: "1.1.0",
  locale: locale.use,
  i18n: locale.i18n,
  install,
  lang: (code) => {
    const langObject = window["xbui/locale"].default;
    if (code === langObject.i.locale) {
      locale.use(langObject);
    } else {
      // tslint:disable-next-line:no-console
      console.log(`The ${code} language pack is not loaded.`);
    }
  },
  XbButton,
  XbCheckbox,
  XbCheckboxGroup,
  XbColor,
  XbForm,
  XbFormItem,
  XbIcon,
  XbInput,
  XbInputNumber,
  XbLoading,
  XbMessageTips,
  XbNav,
  XbNavItem,
  XbPagination,
  XbPoptip,
  XbPopupWindow,
  XbRadio,
  XbRadioGroup,
  XbSearchBtn,
  XbSelect,
  XbSubnav,
  XbTable,
  XbTabs,
  XbTabsPane
};

module.exports.default = module.exports;
