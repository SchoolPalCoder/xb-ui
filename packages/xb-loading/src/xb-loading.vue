<template>
  <div v-if="loadShow" class="xbui-loading" :class="customClass">
    <div class="xbui-loading-wrp">
        <div class="xbui-loading-desc flex-wrp flex-wrp-cnt">
          <div class="xbui-loading-rotate"><xb-icon type="loading" :color="loadColor" :size="loadSize"></xb-icon></div>
          <div class="xbui-loading-txt">{{localeLoadText}}</div>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import Locale from "../../../src/mixins/locale";
import XbIcon from "../../xb-icon";
@Component({
  components: {
    XbIcon
   },
  mixins: [Locale],
})
export default class XbLoading extends Vue {
  // 是否显示loading
  @Prop()
  loadShow!: boolean;

  // loading图标颜色
  @Prop({default:''})
  loadColor?: string;

  // loading图标尺寸
  @Prop({ default: "20px" })
  loadSize?: string;

  // loading文字描述
  @Prop({default:''})
  loadTxt?: string;

  // 自定义样式
  @Prop({ default: "fixed" })
  customClass?: string;

   get localeLoadText() {
    if (!this.loadTxt || this.loadTxt.length==0) {
      return this.t("xb.loading.loadTxt");
    } else {
      return this.loadTxt;
    }
  }
}
</script>
