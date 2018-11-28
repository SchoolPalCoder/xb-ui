<template>
  <li :class="[prefixCls + '-wrap']" v-show="!hidden">
    <div :class="[prefixCls + '-title']">{{ label }}</div>
    <ul>
      <li :class="[prefixCls]" ref="options">
        <slot></slot>
      </li>
    </ul>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

const prefixCls = "ivu-select-group";

@Component({ name: "OptionGroup" })
export default class OptionGroup extends Vue {
  @Prop({ type: String, default: "" })
  label!: string;

  prefixCls: string = prefixCls;
  hidden: boolean = false;
  queryChange() {
    this.$nextTick(() => {
      const options = this.$refs.options.querySelectorAll(".ivu-select-item");
      let hasVisibleOption = false;
      for (let i = 0; i < options.length; i++) {
        if (options[i].style.display !== "none") {
          hasVisibleOption = true;
          break;
        }
      }
      this.hidden = !hasVisibleOption;
    });
  }
  mounted() {
    this.$on("on-query-change", () => {
      this.queryChange();
      return true;
    });
  }
}
</script>
