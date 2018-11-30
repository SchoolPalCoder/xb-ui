<template>
  <div class="side-nav">
    <div v-for="nav in sidebarConf" :key="nav.path" class="group-container">
      <!-- 开发指南 -->
      <div v-if="nav.children&&nav.children.length">
        <p class="side-nav-title">{{nav.text}}</p>
        <div class="side-nav-items" v-for="nav1 in nav.children" :key="nav1.path">
          <router-link active-class="active" :to="{name:base+nav1.text}">{{nav1.text}}</router-link>
        </div>
      </div>
      <!-- 渲染组件 -->
      <div v-else-if="nav.groups">
        <p class="side-nav-title">{{nav.text}}</p>
        <div class="side-nav-items" v-for="nav1 in nav.groups" :key="nav1.folder">
          <p class="side-nav-group">{{nav1.groupName}}</p>
          <div v-for="item in nav1.list" :key="item.path">
            <router-link
              active-class="active"
              class="slid-nav-component"
              :to="{name:base+item.text}"
            >{{item.text}}</router-link>
          </div>
        </div>
      </div>
      <!-- 更新日志 -->
      <router-link class="side-nav-href" v-else tag="p" :to="{name:base+nav.text}">{{nav.text}}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { XbRouteConfig } from "examples/router/types";
import eventBus from "examples/event-bus";

@Component
export default class Sidebar extends Vue {
  @Prop()
  sidebarConf!: XbRouteConfig[];

  base: string = "component-";

  created() {
    // console.log(this.sidebarConf);
  }
}
</script>

<style lang="less" >
.side-nav {
  display: inline-block;
  margin: 32px 0;
  padding: 0;
  color: #3f536e;
  background-color: #fff;
  z-index: 99;
  .group-container {
    margin-bottom: 32px;
  }
  .side-nav-title {
    padding: 0 24px 8px;
    color: #8dabc4;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .side-nav-items {
    font-size: 14px;
    font-weight: normal;
    line-height: 1.8;
    a {
      display: block;
      position: relative;
      padding: 8px 24px;
      color: #3f536e;
      font-weight: normal;
      line-height: 1.5;
      cursor: pointer;
    }
    .side-nav-group {
      display: block;
      position: relative;
      padding: 6px 0 6px 24px;
      color: #2c405a;
      font-weight: bold;
    }
    .slid-nav-component {
      display: block;
      position: relative;
      padding: 6px 24px 6px 32px;
      color: #616367;
      font-size: 14px;
    }
    .active {
      color: #3faaf5;
    }
  }

  .side-nav-href {
    font-size: 14px;
    line-height: 1.8;
    display: block;
    position: relative;
    padding: 6px 0 6px 24px;
    color: #2c405a;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
