import Vue from "vue";

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
