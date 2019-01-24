<template>
  <div :class="[prefixCls+'-nav-item',prefixCls+'-nav-'+parentType,
  isAcitve?prefixCls+'-nav-'+parentType+'-active':'',disabled?prefixCls+'-nav-item-disabled':'']">
    <xb-icon :type="icon" v-if="icon"></xb-icon>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({ name: "XbTabsPane" })
export default class XbTabsPane extends Vue {
  @Prop({ default: "" })
  label!: string;

  @Prop({ default: "" })
  icon!: string;

  @Prop({ default: false })
  disabled!: boolean;

  prefixCls = "xbui-tabs";
  parentType: string = this.$parent.type;
  isAcitve: boolean = this.label === this.$parent.value ? true : false;

  handleChange(index) {
    // this.$parent.value = this.label;
    // this.$parent.$children
    console.log(index);
    // this.updateNav();
    // console.log("-----------------");
    // console.log(this.label);
    // console.log(this.$parent.value);
    // this.isAcitve = true;
  }

  updateNav() {
    console.log(this.disabled);
    this.$parent.updateNav();
  }

  mounted() {
    this.updateNav();
  }

  destroyed() {
    this.updateNav();
  }

  @Watch("label")
  changeLabel(val) {
    this.updateNav();
  }

  @Watch("icon")
  changeIcon(val) {
    this.updateNav();
  }

  @Watch("disabled")
  changeDisabled(val) {
    this.updateNav();
  }
}
</script>
