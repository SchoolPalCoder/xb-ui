<template>
  <div class="layout">
    <Sidebar class="nav" :sidebarConf="sidebarConf"></Sidebar>
    <router-view></router-view>
    <mainFooter></mainFooter>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import mainFooter from "examples/components/footer.vue";
import Sidebar from "examples/components/sidebar.vue";
import { XbRouteConfig } from "examples/router/types";
import { headerConfig } from "examples/router/config";

@Component({
  components: {
    Sidebar,
    mainFooter,
  },
})
export default class Layout extends Vue {
  sidebarConf: XbRouteConfig[] = [];
  private headerConf = headerConfig();

  @Watch("$route")
  onRounteChange() {
    debugger;
    const currentRoute = this.headerConf.find((router: XbRouteConfig) => {
      return router.name === this.$route.name;
    });
    if (currentRoute && currentRoute.children) {
      this.sidebarConf = currentRoute.children;
    }
  }

  created() {
    this.onRounteChange();
  }
}
</script>
