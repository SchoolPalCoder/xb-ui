import Vue from "vue";
// 在vue原型上扩展
declare module "vue/types/vue" {
  interface VueConstructor {
    locale: any;
  }

  interface VueConfiguration {
    lang: string;
  }
}
