<template>
  <div :style="{'border-bottom':type==='card'?'1px solid #e5e5e5':''}">
    <div :class="prefixCls+'-nav'">
      <div v-if="type==='card'" :class="prefixCls+'-nav-border'" :style="{'width':borderWidth+'px','left':borderLeft+'px'}"></div>
      <slot></slot>
    </div>
    <div style="clear:both"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({ name: "XbTabs" })
export default class XbTabs extends Vue {
  @Prop({ default: "" })
  value!: string;

  // tab样式
  @Prop({ default: "line" })
  type!: string;

  prefixCls = "xbui-tabs";
  borderWidth: number = 0;
  borderLeft: number = 0;

  updateNav(width, left) {
    this.borderWidth = width;
    this.borderLeft = left;
  }
}
</script>


