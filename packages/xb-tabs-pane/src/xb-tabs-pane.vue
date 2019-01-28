<template>
  <div
    :class="[prefixCls+'-nav-item',prefixCls+'-nav-'+parentType,isAcitve?prefixCls+'-nav-'+parentType+'-active':'',disabled?prefixCls+'-nav-item-disabled':'']"
    @click="handleClick()"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 文案前的icon -->
    <xb-icon :class="prefixCls+'-nav-vertical'" :type="icon" v-if="icon"></xb-icon>
    <!-- 标签页title -->
    <span :class="prefixCls+'-nav-vertical'">
      {{label}}
      <!-- <slot></slot> -->
    </span>
    <!-- 用户未读信息 -->
    <span v-if="count" :class="prefixCls+'-nav-item-count'">{{count>99?'99+':count}}</span>
    <!-- 关闭icon -->
    <xb-icon
      :class="prefixCls+'-nav-vertical'"
      type="close"
      v-if="(closable&&$parent.type==='card')&&(isAcitve||isIcon)"
      @click.native.stop="removeClick()"
    ></xb-icon>
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

  @Prop({ default: "" })
  count!: number;

  prefixCls = "xbui-tabs";
  parentType: string = this.$parent.type;
  isAcitve: boolean = this.label === this.$parent.value ? true : false;
  isIcon: boolean = false;

  // 点击切换tabs
  handleClick() {
    if (!this.disabled) {
      this.$parent.handleClick(this.label);
    }
  }

  // 移除某一个tabs
  removeClick() {
    if (!this.disabled) {
      this.$parent.removeClick(this.label);
    }
  }

  // 鼠标移入显示close的icon
  handleMouseEnter() {
    this.isIcon = true;
    this.$parent.isIconShow(this.label, true);
  }

  // 鼠标移出隐藏close的icon
  handleMouseLeave() {
    this.isIcon = false;
    this.$parent.isIconShow(this.label, false);
  }

  // 更新type===card的时候，下方border的位置
  updateNavBorder() {
    this.$parent.updateNavBorder(this.closable ? this.$el.offsetWidth + 3 : this.$el.offsetWidth, this.$el.offsetLeft);
  }

  mounted() {
    if (this.parentType === "card" && this.isAcitve) {
      this.updateNavBorder();
    }
  }

  destroyed() {
    this.updateNavBorder();
  }

  @Watch("label")
  changeLabel(val) {
    this.updateNavBorder();
  }

  @Watch("icon")
  changeIcon(val) {
    this.updateNavBorder();
  }

  @Watch("disabled")
  changeDisabled(val) {
    this.updateNavBorder();
  }
}
</script>
