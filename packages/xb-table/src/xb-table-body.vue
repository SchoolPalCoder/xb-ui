<template>
  <table cellspacing="0" cellpadding="0" border="0" :style="styleObject">
    <colgroup>
      <col v-for="(column, index) in columns" :width="setCellWidth(column)">
    </colgroup>
    <tbody :class="[prefixCls + '-tbody']">
      <template v-for="(row, index) in data">
        <xb-table-tr
          :row="row"
          :key="row._rowKey"
          :prefix-cls="prefixCls"
          @mouseenter.native.stop="handleMouseIn(row._index)"
          @mouseleave.native.stop="handleMouseOut(row._index)"
          @click.native="clickCurrentRow(row._index)"
          @dblclick.native.stop="dblclickCurrentRow(row._index)"
        >
          <td v-for="column in columns" :class="alignCls(column, row)">
            <Cell
              :fixed="fixed"
              :prefix-cls="prefixCls"
              :row="row"
              :key="column._columnKey"
              :column="column"
              :natural-index="index"
              :index="row._index"
              :checked="rowChecked(row._index)"
              :disabled="rowDisabled(row._index)"
              :expanded="rowExpanded(row._index)"
            ></Cell>
          </td>
        </xb-table-tr>
        <tr v-if="rowExpanded(row._index)" :class="{[prefixCls + '-expanded-hidden']: fixed}">
          <td :colspan="columns.length" :class="prefixCls + '-expanded-cell'">
            <Expand :key="row._rowKey" :row="row" :render="expandRender" :index="row._index"></Expand>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
<script lang="ts">
import { Component, Prop, Vue, Mixins } from "vue-property-decorator";
import XbTableTr from "./xb-table-tr.vue";
import Cell from "./xb-cell.vue";
import Expand from "./expand";
import Mixin from "./mixin";

@Component({ name: "XbTableBody", components: { Cell, Expand, XbTableTr } })
export default class XbTableBody extends Mixins(Mixin) {
  @Prop({ type: String })
  prefixCls!: string;
  @Prop({ type: Object })
  styleObject!: object;
  @Prop({ type: Array })
  columns!: any[];
  @Prop({ type: Array })
  data!: any[]; // rebuildData
  @Prop({ type: Object })
  objData!: object;
  @Prop({ type: Object })
  columnsWidth!: object;
  @Prop({
    type: [Boolean, String],
    default: false,
  })
  fixed!: boolean | string;

  get expandRender() {
    let render = function() {
      return "";
    };
    for (const column of this.columns) {
      if (column.type && column.type === "expand") {
        if (column.render) {
          render = column.render;
        }
      }
    }
    return render;
  }

  rowChecked(index) {
    return this.objData[index] && this.objData[index]._isChecked;
  }
  rowDisabled(index) {
    return this.objData[index] && this.objData[index]._isDisabled;
  }
  rowExpanded(index) {
    return this.objData[index] && this.objData[index]._isExpanded;
  }
  handleMouseIn(index) {
    this.$parent.handleMouseIn(index);
  }
  handleMouseOut(index) {
    this.$parent.handleMouseOut(index);
  }
  clickCurrentRow(index) {
    this.$parent.clickCurrentRow(index);
  }
  dblclickCurrentRow(index) {
    this.$parent.dblclickCurrentRow(index);
  }
}
</script>
