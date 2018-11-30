
<template>
  <header
    class="page-header"
    :style="$route.path === '/' ? 'box-shadow:none' : 'box-shadow:0 10px 60px 0 rgba(29,29,31,0.07)'"
  >
    <div class="header-container">
      <router-link :to="'/'">
        <img src="../assets/img/banner.png" width="100">
      </router-link>
      <router-link v-for="conf in headerConf" :key="conf.path" :to="conf.path">{{conf.text}}</router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { XbRouteConfig } from "../router/types";
import headerConfig from "examples/router/nav.config.json";
import eventBus from "examples/event-bus";

@Component({})
export default class MainHeader extends Vue {
  headerConf = headerConfig;

  // clickHeader(config) {
  //   eventBus.$emit("headerClick", config.children);
  // }
}
</script>

<style  lang="less">
.page-header {
  background-color: #fff;
  box-shadow: 0 10px 60px 0 rgba(29, 29, 31, 0.07);
  opacity: 0.98;
  position: relative !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  transition: all 0.3s;
  z-index: 100;
  .header-container {
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 80px;
    justify-content: space-between;
  }
}
</style>
