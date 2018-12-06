<template>
  <div :class="classes" ref="cell">
    <template v-if="renderType === 'index'">
      <span>{{naturalIndex + 1}}</span>
    </template>
    <template v-if="renderType === 'selection'">
      <Checkbox
        :value="checked"
        @click.native.stop="handleClick"
        @on-change="toggleSelect"
        :disabled="disabled"
      ></Checkbox>
    </template>
    <template v-if="renderType === 'html'">
      <span v-html="row[column.key]"></span>
    </template>
    <template v-if="renderType === 'normal'">
      <span>{{row[column.key]}}</span>
    </template>
    <template v-if="renderType === 'expand' && !row._disableExpand">
      <div :class="expandCls" @click="toggleExpand">
        <Icon type="ios-arrow-right"></Icon>
      </div>
    </template>
    <Cell
      v-if="renderType === 'render'"
      :row="row"
      :column="column"
      :index="index"
      :render="column.render"
    ></Cell>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Mixins } from "vue-property-decorator";
import Cell from "./expand";
import Icon from "../../xb-icon";
import Checkbox from "../../xb-checkbox";

@Component({ name: "XbTableCell", components: { Icon, Checkbox, Cell } })
export default class XbTableCell extends Vue {
  @Prop({ type: String })
  prefixCls!: string;
  @Prop({ type: Object })
  row!: object;
  @Prop({ type: Object })
  column!: object;
  @Prop({ type: Number })
  naturalIndex!: number; // index of rebuildData
  @Prop({ type: Number })
  index!: number; // _index of data
  @Prop({ type: Boolean })
  checked!: boolean;
  @Prop({ type: Boolean })
  disabled!: boolean;
  @Prop({ type: Boolean })
  expanded!: boolean;
  @Prop({ type: [Boolean, String], default: false })
  fixed!: boolean | string;

  renderType: string = "";
  uid: number = -1;
  context: any = this.$parent.$parent.$parent.currentContext;

  get classes() {
    return [
      `${this.prefixCls}-cell`,
      {
        [`${this.prefixCls}-hidden`]:
          !this.fixed && this.column.fixed && (this.column.fixed === "left" || this.column.fixed === "right"),
        [`${this.prefixCls}-cell-ellipsis`]: this.column.ellipsis || false,
        [`${this.prefixCls}-cell-with-expand`]: this.renderType === "expand",
      },
    ];
  }
  get expandCls() {
    return [
      `${this.prefixCls}-cell-expand`,
      {
        [`${this.prefixCls}-cell-expand-expanded`]: this.expanded,
      },
    ];
  }

  toggleSelect() {
    this.$parent.$parent.$parent.toggleSelect(this.index);
  }
  toggleExpand() {
    this.$parent.$parent.$parent.toggleExpand(this.index);
  }
  handleClick() {
    // 放置 Checkbox 冒泡
  }
  created() {
    if (this.column.type === "index") {
      this.renderType = "index";
    } else if (this.column.type === "selection") {
      this.renderType = "selection";
    } else if (this.column.type === "html") {
      this.renderType = "html";
    } else if (this.column.type === "expand") {
      this.renderType = "expand";
    } else if (this.column.render) {
      this.renderType = "render";
    } else {
      this.renderType = "normal";
    }
  }
}
</script>
