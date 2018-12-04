// 让ts识别.vue文件
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
