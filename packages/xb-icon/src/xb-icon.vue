<template>
  <i :class="classes" :style="styles"></i>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
const prefixCls = "xb-icon";
@Component({ name: "XbIcon" })
export default class XbIcon extends Vue {
  @Prop({ type: String })
  type!: string;

  @Prop()
  size!: any;

  @Prop({ type: String })
  color!: string;

  get classes(): string {
    return `${prefixCls}-${this.type}`;
  }

  get styles(): object {
    const style = {};
    const reg = /^[0-9]*$/;
    if (reg.test(this.size)) {
      style["font-size"] = `${this.size}px`;
    } else {
      style["font-size"] = `${this.size}`;
    }

    if (this.color) {
      style["color"] = `${this.color}`;
    }

    return style;
  }
}
</script>
