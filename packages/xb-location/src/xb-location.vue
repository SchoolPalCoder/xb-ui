<template>
  <div :class="locationClass">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
const prefixCls = "xbui-location";

@Component({ name: "XbLocation" })
export default class XbLocation extends Vue {
  @Prop({ type: String, default: '/'})
  separator!: string;

  get locationClass() {
    return `${prefixCls}`;
  }


}
</script>
