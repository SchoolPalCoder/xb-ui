<template>
  <div class="pg-index">
    <div class="index-container">
      <img src="../assets/img/logo.png">
      <p>一款轻量级、模块化的前端 UI 组件库</p>
    </div>
    <div class="separate-panel">
      <div class="about">
        <router-link :to="'/components'">开始使用</router-link>
        <a
          target="_blank"
          class="btn-github"
          href="https://github.com/SchoolPalCoder/Xb-Basic-Components"
        >GitHub</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Index extends Vue {
  // height: number = document.documentElement.clientHeight;
}
</script>

<style  lang="less">
.pg-index {
  .index-container {
    width: 960px;
    margin: 0 auto;
    text-align: center;
    padding: 100px 0;
    p {
      margin-top: 56px;
      color: #8994c6;
      font-size: 32px;
    }
  }
  .separate-panel {
    position: relative;
    .about {
      position: absolute;
      width: 100%;
      height: 200px;
      top: 20px;
      z-index: 9;
      background: #fff;
      text-align: center;
      a {
        color: #fff;
        background-image: linear-gradient(90deg, #00aeff 0%, #3369e7 100%);
        box-shadow: 0 2px 6px 0 rgba(51, 105, 231, 0.4);
        display: inline-block;
        width: 190px;
        height: 56px;
        margin: 0 35px;
        font-size: 18px;
        line-height: 56px;
        border-radius: 28px;
        transition: all 0.3s;
        cursor: pointer;
      }
      .btn-github {
        color: #316de9;
        border: 1px solid #2f6ee9;
        background: #fff;
        box-shadow: none;
      }
    }
  }
  .separate-panel:after {
    content: "";
    display: block;
    position: absolute;
    top: -80px;
    width: 100%;
    height: 250px;
    background: #fff;
    box-shadow: 0 -4px 30px 0 #dfe1e6;
    transform: skewY(-4deg);
  }
}
</style>
