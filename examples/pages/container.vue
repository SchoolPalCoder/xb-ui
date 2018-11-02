<template>
  <div>
    <div class="layout">
      <Sidebar class="nav" :sidebarConf="sidebarConf"></Sidebar>
      <router-view class="view"></router-view>
    </div>
    <mainFooter></mainFooter>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import mainFooter from "examples/components/footer.vue";
import Sidebar from "examples/components/sidebar.vue";
import { XbRouteConfig } from "examples/router/types";
import headerConfig from "examples/router/nav.config.json";

@Component({
  components: {
    Sidebar,
    mainFooter,
  },
})
export default class Layout extends Vue {
  sidebarConf: XbRouteConfig[] = [];

  @Watch("$route")
  onRounteChange() {
    const currentRoute = headerConfig.find((router: XbRouteConfig) => {
      return router.path === this.$route.path;
    });
    if (currentRoute && currentRoute.children) {
      this.sidebarConf = currentRoute.children;
    } else {
      this.sidebarConf = [];
    }
  }

  created() {
    this.onRounteChange();
  }
}
</script>


<style lang="less">
.layout {
  margin: 48px auto;
  width: 90%;
  background-color: #fff;
  box-shadow: 0 4px 30px 0 rgba(223, 225, 230, 0.5);
  .nav {
    float: left;
    width: 210px;
  }
  .view {
    float: left;
    width: calc(~"100% - 215px");
    padding: 32px 48px 48px;
    box-sizing: border-box;
  }
}

.layout:after {
  content: "";
  clear: both;
  display: block;
}
</style>
