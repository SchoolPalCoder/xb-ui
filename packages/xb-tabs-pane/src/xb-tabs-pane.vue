<template>
  <div :class="[prefixCls+'-nav-item',prefixCls+'-nav-'+parentType,isAcitve?prefixCls+'-nav-'+parentType+'-active':'',disabled?prefixCls+'-nav-item-disabled':'']">
    <xb-icon :class="prefixCls+'-nav-vertical'" :type="icon" v-if="icon"></xb-icon>
    <span :class="prefixCls+'-nav-vertical'"><slot></slot></span>
    <xb-icon :class="prefixCls+'-nav-vertical'" type="close" v-if="closable&&$parent.type==='card'"></xb-icon>
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

  @Prop({ default: false })
  closable!: boolean;

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
    if (this.parentType === "card" && this.isAcitve) {
      this.$parent.updateNav(this.closable ? this.$el.offsetWidth + 3 : this.$el.offsetWidth, this.$el.offsetLeft);
    }
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
