<template>
  <div class="container">
    <Sidebar class="nav" v-if="isContent"></Sidebar>
    <router-view class="view"></router-view>
    <mainFooter v-if="isContent"></mainFooter>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import mainFooter from "../components/footer.vue";
import Sidebar from "../components/sidebar.vue";

@Component({
  components: {
    Sidebar,
    mainFooter,
  },
})
export default class Container extends Vue {
  isContent: boolean = false;

  @Watch("$route")
  onRounteChange() {
    this.isContent = this.$route.name !== "index";
  }
}
</script>

<style lang="less" >
.container {
  margin: 48px auto;
  width: 90%;
  background-color: #fff;
  box-shadow: 0 4px 30px 0 rgba(223, 225, 230, 0.5);
  .nav {
    float: left;
    width: 210px;
  }
  .view {
    // float: left;
    // width: calc(~"100% - 215px");
    // padding: 32px 48px 48px;
    box-sizing: border-box;
  }
}

.container:after {
  content: "";
  clear: both;
  display: block;
}
</style>
