// 因为ts只识别.js/.jsx/.ts/.tsx这几类文件，所以配置这个让ts识别.vue文件
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
