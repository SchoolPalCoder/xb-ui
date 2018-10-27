
<template>
  <header class="page-header" :style="$route.name === 'index' ? 'box-shadow:none' : 'box-shadow:0 10px 60px 0 rgba(29,29,31,0.07)'">
    <div class="header-container">
      <router-link :to="{name: 'index'}"><img src="../assets/img/banner.png" width="100"></router-link>
      <router-link v-for="nav in headerRouter" :key="nav.path" :to="nav.path">{{nav.text}}</router-link>
      <a href="https://github.com/SchoolPalCoder/Xb-Basic-Components" target="_balck">GitHub</a>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { XbRouteConfig } from "../router/types";

@Component({})
export default class MainHeader extends Vue {
  @Prop({ default: [] })
  headerRouter!: XbRouteConfig;
}
</script>

<style type="text/less" lang="less">
@import "../assets/less/index";
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
