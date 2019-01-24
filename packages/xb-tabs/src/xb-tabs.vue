<template>

  <div>
      <slot></slot>
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
  // navList: any = [];
}
</script>


