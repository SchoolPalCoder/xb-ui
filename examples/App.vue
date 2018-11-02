<template>
  <div>
    <mainHeader :headerRouter="headerRouter"></mainHeader>
    <router-view class="view"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import mainHeader from "./components/header.vue";
import router from "./router/nav.config.json";

@Component({
  components: {
    mainHeader,
  },
})
export default class App extends Vue {
  get headerRouter() {
    return router.map((route) => {
      return {
        text: route.text,
        path: route.path,
      };
    });
  }
}
</script>

<style lang="less" >
@import "./assets/less/index";
</style>
