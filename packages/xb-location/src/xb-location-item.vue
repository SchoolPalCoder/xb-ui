<template>
  <span>
    <span :class="[itemClass, to ? linkItemClass : '' ]" @click="handleClick">
        <slot></slot>
    </span>
    <span :class="separatorClass">{{separator}}</span>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
const prefixCls = "xbui-location-item";


@Component({ name: "XbLocationItem" })
export default class XbLocationItem extends Vue {

  @Prop({ type: [Object, String]})
  to!: [object, string];

  @Prop({ type: Boolean, default: false})
  replace!: boolean;

  prefixCls: string = prefixCls;
  separator: string = '';

  get itemClass() {
    return `${prefixCls}`;
  }

  get linkItemClass() {
    return `${prefixCls}-link`;
  }

  get separatorClass() {
    return `${prefixCls}-separator`;
  }

  mounted() {
    this.separator = this.$parent.separator
  }

  handleClick() {

    if (this.$router && this.to) {

      this.replace ? this.$router.replace(this.to) : this.$router.push(this.to);

    }

  }


}
</script>
