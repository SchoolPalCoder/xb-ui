import Vue from "vue";
import messageVue from "./xb-message-tips.vue";
import { Options } from "./type";

const defaults: Options = {
  show: false,
  text: "",
  type: "info",
  duration: 2000,
  closable: false,
};

const iconTypes = {
  info: {
    name: "info-circle",
    color: "#1890FF",
  },
  success: {
    name: "success-circle",
    color: "#52C41A",
  },
  warning: {
    name: "warning-circle",
    color: "#FAAD14",
  },
  error: {
    name: "error-circle",
    color: "#F5222D",
  },
  loading: {
    name: "info-circle",
    color: "blue",
  },
};

const messageConstructor = Vue.extend(messageVue);
messageConstructor.prototype.close = function() {
  const vm = this;
  this.$on("afterLeave", () => {
    if (vm.$el && vm.$el.parentNode) {
      vm.$el.parentNode.removeChild(vm.$el);
    }
    this.$destroy();
  });
  vm.show = false;
};

class MessageBox {
  constructor() {}
  getContainer() {
    if (document.querySelectorAll(".xbui-messageBox").length == 0) {
      let messageBoxContainer = document.createElement("div");
      messageBoxContainer.className = "xbui-messageBox";
      document.body.appendChild(messageBoxContainer);
    }
  }
  createElement(type: string, options: Options) {
    this.getContainer();
    options = Object.assign({}, defaults, options);
    options.type = iconTypes[type];
    let parents = document.querySelectorAll(".xbui-messageBox");
    let instance = new messageConstructor({
      el: document.createElement("div"),
      data: options,
    });
    parents[0].appendChild(instance.$el);

    let timer: any;

    Vue.nextTick(() => {
      instance.show = true;
      timer = setTimeout(function() {
        instance.close();
      }, options.duration);
    });

    instance.$on("close", () => {
      instance.close();
      clearTimeout(timer);
    });
  }
}

let messageBox = new MessageBox();
let MessageTips = {
  name: "messageBox",
  message(type, options) {
    return messageBox.createElement(type, options);
  },
  info(options) {
    return this.message("info", options);
  },
  success(options) {
    return this.message("success", options);
  },
  error(options) {
    return this.message("error", options);
  },
  warning(options) {
    return this.message("warning", options);
  },
};

// Vue.prototype.$message = MessageTips;

export default MessageTips;
