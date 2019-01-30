<template>
  <div :class="prefixCls">
    <span :class="[prefixCls + '-total']">共{{total}}条</span>
    <ul :class="{[prefixCls+ '-bg']:background}">
      <li :class="[prefixCls + '-item']" @click="arrowLeftClick">
        <a>
          <xb-icon type="arrow-left"></xb-icon>
        </a>
      </li>
      <li :class="[prefixCls + '-item',{[prefixCls + '-current']:1 === innerCurrentPage}]">
        <a @click="pageClick(1)">1</a>
      </li>
      <li v-if="showFrontPoints" :class="[prefixCls + '-item']">
        <a>...</a>
      </li>
      <li
        :class="[prefixCls + '-item',{[prefixCls + '-current']:p === innerCurrentPage}]"
        v-for="p in pages"
      >
        <a @click="pageClick(p)">{{p}}</a>
      </li>
      <li v-if="showBehindPoints" :class="[prefixCls + '-item']">
        <a>...</a>
      </li>
      <li
        v-if="pageCount>1"
        :class="[prefixCls + '-item',{[prefixCls + '-current']:pageCount === innerCurrentPage}]"
      >
        <a @click="pageClick(pageCount)">{{pageCount}}</a>
      </li>
      <li :class="[prefixCls + '-item']" @click="arrowRightClick">
        <a>
          <xb-icon type="arrow-right"></xb-icon>
        </a>
      </li>
    </ul>
    <div :class="[prefixCls + '-jump']" v-if="showJumper">
      <span>前往</span>
      <input
        type="text"
        :class="[prefixCls + '-input']"
        v-model="inputModel"
        @input="pageJump(inputModel)"
      >
      <span>页</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { constants, connect } from "http2";

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
  showSizesSelect!: boolean;
  //是否为分页按钮添加背景色
  @Prop({ type: Boolean, default: false })
  background!: boolean;

  prefixCls = "xbui-pagination";
  //初始化的时候 拷贝一份currentPage的值用于后面修改
  innerCurrentPage: number = this.currentPage;
  //跳转框model
  inputModel: number = this.currentPage;
  //最多显示页码数
  showPagerNum: number = 7;
  arrowLeftClick(event: void) {
    this.innerCurrentPage = this.innerCurrentPage - 1;
    this.inputModel = this.innerCurrentPage;
    this.$emit("page-change", { "0": this.innerCurrentPage, "1": this.pageSize });
  }
  arrowRightClick(event: void) {
    this.innerCurrentPage = this.innerCurrentPage + 1;
    this.inputModel = this.innerCurrentPage;
    this.$emit("page-change", { "0": this.innerCurrentPage, "1": this.pageSize });
  }
  pageClick(p: number) {
    this.innerCurrentPage = p;
    this.inputModel = this.innerCurrentPage;
    this.$emit("page-change", { "0": this.innerCurrentPage, "1": this.pageSize });
  }
  pageJump(p: number) {
    let reg = /^[1-9]\d*$/;
    let s = p + "";
    if (s) {
      if (new RegExp(reg).test(s) && p <= this.pageCount) {
        this.innerCurrentPage = Number(p);
        this.$emit("page-change", { "0": this.innerCurrentPage, "1": this.pageSize });
      } else {
        this.inputModel = Number(this.innerCurrentPage);
      }
    }
  }
  //获取总页数
  get pageCount() {
    return this.total ? Math.ceil(this.total / this.pageSize) : 1;
  }
  get pages() {
    let pageAry: number[];
    const showFrontPoints = this.showFrontPoints;
    const showBehindPoints = this.showBehindPoints;
    if (!showFrontPoints && !showBehindPoints) {
      //pageCount小于7
      pageAry = Array.from({ length: this.pageCount - 2 }, (value, index) => index + 2);
    } else if (!showFrontPoints && showBehindPoints) {
      pageAry = Array.from({ length: this.showPagerNum - 2 }, (value, index) => index + 2);
    } else if (showFrontPoints && !showBehindPoints) {
      pageAry = Array.from(
        { length: this.showPagerNum - 2 },
        (value, index) => this.pageCount - this.showPagerNum + 2 + index
      );
    } else if (showFrontPoints && showBehindPoints) {
      pageAry = Array.from(
        { length: this.showPagerNum - 2 },
        (value, index) => this.innerCurrentPage - (this.showPagerNum - 3) / 2 + index
      );
    }
    return pageAry;
  }
  get showFrontPoints() {
    const minPrevPage = (this.showPagerNum + 1) / 2;
    if (this.pageCount > this.showPagerNum) {
      return this.innerCurrentPage > minPrevPage;
    } else {
      return false;
    }
  }
  get showBehindPoints() {
    const minNextPage = (this.showPagerNum - 1) / 2;
    if (this.pageCount > this.showPagerNum) {
      return this.innerCurrentPage < this.pageCount - minNextPage;
    } else {
      return false;
    }
  }
}
</script>
