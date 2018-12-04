<template>
  <div class="page-footer">
    <div class="footer-container">
      <div type="flex" justify="space-between">
        <div :span="12" class="text-left">
          <a>
            <img src="../assets/img/avater.jpg" width="80">
          </a>
          <div>
            <p>Author: 校宝在线IBU前端研发组</p>
            <p>Github: Xb-Basic-Components</p>
          </div>
        </div>
        <div :span="12" class="text-right"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>


<style lang="less"  >
.page-footer {
  padding: 30px 0 30px;
  color: #6190e8;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 30px 0 rgba(223, 225, 230, 0.8);
  .footer-container {
    width: 90%;
    margin: 0 auto;
  }
  .text-left {
    font-size: 12px;
    display: flex;
    align-items: center;
    color: #5e6d82;
    img {
      border-radius: 100%;
      margin-right: 10px;
    }
    a {
      color: #6190e8;
    }
  }
}
</style>
