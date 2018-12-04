<template>
  <div v-if="loadShow" class="xb-loading" :class="customClass">
    <div class="xb-loading-wrp">
        <div class="xb-loading-desc" :style="{backgroundImageUrl:loadingImg}">
          <span class="xb-loading-txt">{{loadTxt}}</span>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
@Component
export default class XbLoading extends Vue {
  // 是否显示loading
  @Prop()
  loadShow!: boolean;

  // loading图标
  @Prop({ default: "./load.png" })
  loadingImg?: string;

  // loading文字描述
  @Prop({default:'加载中……'})
  loadTxt?: string;

  // 自定义样式
  @Prop({ default: "fixed" })
  customClass?: string;
}
</script>
