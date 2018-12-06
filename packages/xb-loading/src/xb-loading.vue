<template>
  <div v-if="loadShow" :class="[prefixCls,customClass]">
    <div :class="[prefixCls + '-wrp']">
        <div :class="[prefixCls + '-desc','flex-wrp','flex-wrp-cnt']">
          <div :class="[prefixCls + '-rotate']" ><xb-icon type="loading" :color="loadColor" :size="loadSize"></xb-icon></div>
          <div :class="[prefixCls + '-txt']" v-if="showTxt">{{localeLoadText}}</div>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import Locale from "../../../src/mixins/locale";
import XbIcon from "../../xb-icon";
const prefixCls = "xbui-loading";
@Component({
  components: {
    XbIcon
   },
  mixins: [Locale],
})
export default class XbLoading extends Vue {
  prefixCls: string = prefixCls;
  // 是否显示loading
  @Prop()
  loadShow!: boolean;

  // loading图标颜色
  @Prop({default:''})
  loadColor?: string;

  // loading图标尺寸
  @Prop({ default: "20px" })
  loadSize?: string;
  // 是否显示文字
  @Prop({default: true})
  showTxt?: boolean;

  // loading文字描述
  @Prop({default: ''})
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
