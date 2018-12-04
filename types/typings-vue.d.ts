import Vue from "vue";
import {} from "vue/src/core/observer";

// 在vue原型上扩展
declare module "vue/types/vue" {
  interface Vue {
    observer: any;
  }

  interface VueConstructor {
    locale: any;
  }

  interface VueConfiguration {
    lang: string;
  }
}
