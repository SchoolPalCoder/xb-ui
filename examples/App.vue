<template>
  <div>
    <mainHeader :headerRouter="headerRouter"></mainHeader>
    <router-view class="view"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import mainHeader from "./components/header.vue";
import { headerConfig } from "./router/config";

@Component({
  components: {
    mainHeader,
  },
})
export default class App extends Vue {
  headerRouter = headerConfig();
}
</script>

<style lang="less" >
@import "./assets/less/index";
</style>
