<template>
  <tr :class="rowClasses(row._index)">
    <slot></slot>
  </tr>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({ name: "XbTableTr" })
export default class XbTableTr extends Vue {
  @Prop({ type: Object })
  row!: object;
  @Prop({ type: String })
  prefixCls!: string;

  get objData() {
    return this.$parent.objData;
  }

  rowClasses(index) {
    return [
      `${this.prefixCls}-row`,
      this.rowClsName(index),
      {
        [`${this.prefixCls}-row-highlight`]: this.objData[index] && this.objData[index]._isHighlight,
        [`${this.prefixCls}-row-hover`]: this.objData[index] && this.objData[index]._isHover,
      },
    ];
  }

  rowClsName(index) {
    return this.$parent.$parent.rowClassName(this.objData[index], index);
  }
}
</script>
