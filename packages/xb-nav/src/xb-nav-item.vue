<template>
  <a
    v-if="to != '-'"
    :href="getLinkUrl"
    :target="target"
    :class="itemClass"
    @click.exact="handleClick($event, false)"
    @click.ctrl="handleClick($event, true)"
    @click.meta="handleClick($event, true)"
  >
    <slot></slot>
  </a>
  <li v-else :key="name" :class="itemClass" :style="itemStyle" @click.stop="handleClick">
    <slot></slot>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Watch, Mixins } from "vue-property-decorator";
import { findComponentUpward, findComponentDownward, findComponentsUpward } from "src/utils/assist";
import Emitter from "src/mixins/emitter";

const prefixCls = "xbui-nav";

@Component({ name: "XbNavItem" })
class XbNavItem extends Mixins(Emitter) {
  active: boolean = false;

  // 唯一标识
  @Prop({
    type: [String, Number],
    default: "-",
  })
  name!: string | number;
  /* 跳转的链接 */
  @Prop({
    type: [String, Object],
    default: "-",
  })
  to!: string | object;
  /* 路由跳转 */
  @Prop({ default: false }) replace!: boolean;
  /* 相当于a链接的target属性 */
  @Prop({
    type: String,
    validator(value) {
      return ["_blank", "_self", "_parent", "_top"].includes(value);
    },
    default: "_self",
  })
  target!: string;

  // Computed
  get itemClass() {
    const itemPrefixCls = `${prefixCls}-item`;
    return [
      itemPrefixCls,
      {
        [`${itemPrefixCls}-active`]: this.active,
        [`${itemPrefixCls}-selected`]: this.active,
      },
    ];
  }

  get itemStyle() {
    const hasParentSubnav = !!findComponentsUpward(this, "XbSubnav");
    const parentSubnavLength = findComponentsUpward(this, "XbSubnav").length;
    return hasParentSubnav
      ? {
          paddingLeft: 43 + (parentSubnavLength - 1) * 24 + "px",
        }
      : {};
  }

  get getLinkUrl() {
    return typeof this.to === "string" ? this.to : null;
  }

  // Watch
  @Watch("")
  handleClick(evt: MouseEvent, newWindow: boolean = false) {
    // console.assert(hasParent, 'XbNavItem has no parent');
    // For test a标签事件
    // evt.preventDefault();
    // console.warn( this.target, newWindow);
    if (newWindow || this.target === "_blank") {
      const parentMenu = findComponentUpward(this, "XbNav");
      !!parentMenu && parentMenu.onSelect(this.name);

      this.handleCheckItemClick(evt, newWindow);
    } else {
      const hasParent = findComponentUpward(this, "XbSubnav");

      if (hasParent) {
        this.dispatch("XbSubnav", "on-menu-item-select", this.name);
      } else {
        this.dispatch("XbNav", "on-menu-item-select", this.name);
      }

      this.handleCheckItemClick(evt, newWindow);
    }
  }

  handleCheckItemClick(evt: MouseEvent, newWindow: boolean = false) {
    if (!!this.to && this.to !== "-") {
      if (this.target === "_blank") {
        return false;
      } else {
        evt.preventDefault();
        this.handleRoute(newWindow);
      }
    }
  }

  handleRoute(newWindow: boolean = false) {
    const url = `${this.to}`;
    if (newWindow) {
      window.open(url);
    } else {
      const route = this.$router;
      if (!!route) {
        this.replace ? this.$router.replace(url) : this.$router.push(url);
      } else {
        window.location.href = url;
      }
    }
  }

  // Lifecycle
  mounted() {
    this.$on("on-update-active-name", (name: string) => {
      this.active = this.name === name;
    });
  }
}

export default XbNavItem;
</script>
