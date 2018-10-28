<template>
  <div>
    <mainHeader :headerRouter="headerRouter"></mainHeader>
    <Container></Container>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import mainHeader from "./components/header.vue";
import navConfig from "./router/header.config";
import Container from "./pages/container.vue";

@Component({
  components: {
    mainHeader,
    Container,
  },
})
export default class App extends Vue {
  headerRouter = navConfig();
}
</script>

<style lang="less" >
@import "./assets/less/index";
</style>
