<template>
  <div :class="prefixCls">
    <span :class="[prefixCls + '-total']">共{{total}}条</span>
    <ul>
      <li :class="[prefixCls + '-item']" @click="arrowLeftClick">
        <a>
          <xb-icon type="arrow-left"></xb-icon>
        </a>
      </li>
      <li :class="[prefixCls + '-item']" v-for="p in frontPages">
        <a>{{p}}</a>
      </li>
      <li v-if="currentPage>4" :class="[prefixCls + '-item']">
        <a>...</a>
      </li>
      <li :class="[prefixCls + '-item']" v-for="p in centerPages">
        <a>{{p}}</a>
      </li>
      <li v-if="currentPage < pageCount - 3" :class="[prefixCls + '-item']">
        <a>...</a>
      </li>
      <li v-if="pageCount>1" :class="[prefixCls + '-item']" v-for="p in behindPages">
        <a>{{p}}</a>
      </li>
      <li :class="[prefixCls + '-item']" @click="arrowRightClick">
        <a>
          <xb-icon type="arrow-right"></xb-icon>
        </a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { constants } from "http2";

// const prefixCls = ;

@Component({ name: "XbPagination" })
export default class XbPagination extends Vue {
  @Prop({ type: Number, default: 10 })
  pageSize!: number;

  @Prop({ type: Number, default: 1 })
  currentPage!: number;

  @Prop(Array)
  pageSizes!: number[];

  //总数
  @Prop({ type: Number, default: 0 })
  total!: number;

  //是否显示页码跳转
  @Prop({ type: Boolean, default: false })
  showJumper!: boolean;

  //是否显示pageSize下拉选择
  @Prop({ type: Boolean, default: false })
  showSizer!: boolean;
  prefixCls = "xbui-pagination";
  arrowLeftClick(event: void) {
    this.$emit("page-change", { "0": this.currentPage - 1, "1": this.pageSize });
  }
  arrowRightClick(event: void) {
    this.$emit("page-change", { "0": this.currentPage + 1, "1": this.pageSize });
  }
  //获取总页数
  get pageCount() {
    return this.total ? Math.ceil(this.total / this.pageSize) : 1;
  }
  //获取前部分页码范围
  get frontPages() {
    return this.currentPage < 5 ? Array.from({ length: 5 }, (value, index) => index + 1) : [1];
  }
  //获取中间部分页码范围
  get centerPages() {
    return this.currentPage > 4 && this.currentPage < this.pageCount - 3
      ? Array.from({ length: 5 }, (value, index) => this.currentPage - 2 + index)
      : [];
  }
  //获取后部分页码范围
  get behindPages() {
    return this.currentPage > this.pageCount - 4
      ? Array.from({ length: 5 }, (value, index) => this.pageCount - 4 + index)
      : [this.pageCount];
  }
}
</script>
