import Vue from "vue";

// 让ts识别.vue文件
declare module "*.vue" {
  export default Vue;
}

// 在vue原型上扩展
declare module "vue/types/vue" {
  // 3. 声明为 Vue 补充的东西
  interface VueConstructor {
    locale: any;
  }

  interface VueConfiguration {
    lang: string;
  }
}
