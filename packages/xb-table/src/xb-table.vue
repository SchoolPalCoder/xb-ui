<template>
  <div :class="wrapClasses" :style="styles">
    <div :class="classes">
      <div :class="[prefixCls + '-title']" v-if="showSlotHeader" ref="title">
        <slot name="header"></slot>
      </div>
      <div
        :class="[prefixCls + '-header']"
        v-if="showHeader"
        ref="header"
        @mousewheel="handleMouseWheel"
      >
        <table-head
          :prefix-cls="prefixCls"
          :styleObject="tableHeaderStyle"
          :columns="cloneColumns"
          :column-rows="columnRows"
          :obj-data="objData"
          :columns-width="columnsWidth"
          :data="rebuildData"
        ></table-head>
      </div>
      <div
        :class="[prefixCls + '-body']"
        :style="bodyStyle"
        ref="body"
        @scroll="handleBodyScroll"
        v-show="!((!!localeNoDataText && (!data || data.length === 0)) || (!!localeNoFilteredDataText && (!rebuildData || rebuildData.length === 0)))"
      >
        <table-body
          ref="tbody"
          :prefix-cls="prefixCls"
          :styleObject="tableStyle"
          :columns="cloneColumns"
          :data="rebuildData"
          :columns-width="columnsWidth"
          :obj-data="objData"
        ></table-body>
      </div>
      <div
        :class="[prefixCls + '-tip']"
        :style="bodyStyle"
        @scroll="handleBodyScroll"
        v-show="((!!localeNoDataText && (!data || data.length === 0)) || (!!localeNoFilteredDataText && (!rebuildData || rebuildData.length === 0)))"
      >
        <table cellspacing="0" cellpadding="0" border="0">
          <tbody>
            <tr>
              <td :style="{'height':bodyStyle.height,'width':`${this.headerWidth}px`}">
                <span v-html="localeNoDataText" v-if="!data || data.length === 0"></span>
                <span v-html="localeNoFilteredDataText" v-else></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div :class="[prefixCls + '-fixed']" :style="fixedTableStyle" v-if="isLeftFixed">
        <div :class="fixedHeaderClasses" v-if="showHeader">
          <table-head
            fixed="left"
            :prefix-cls="prefixCls"
            :styleObject="fixedTableStyle"
            :columns="leftFixedColumns"
            :column-rows="columnRows"
            :fixed-column-rows="leftFixedColumnRows"
            :obj-data="objData"
            :columns-width="columnsWidth"
            :data="rebuildData"
          ></table-head>
        </div>
        <div
          :class="[prefixCls + '-fixed-body']"
          :style="fixedBodyStyle"
          ref="fixedBody"
          @mousewheel="handleFixedMousewheel"
          @DOMMouseScroll="handleFixedMousewheel"
        >
          <table-body
            fixed="left"
            :prefix-cls="prefixCls"
            :styleObject="fixedTableStyle"
            :columns="leftFixedColumns"
            :data="rebuildData"
            :columns-width="columnsWidth"
            :obj-data="objData"
          ></table-body>
        </div>
      </div>
      <div :class="[prefixCls + '-fixed-right']" :style="fixedRightTableStyle" v-if="isRightFixed">
        <div :class="fixedHeaderClasses" v-if="showHeader">
          <table-head
            fixed="right"
            :prefix-cls="prefixCls"
            :styleObject="fixedRightTableStyle"
            :columns="rightFixedColumns"
            :column-rows="columnRows"
            :fixed-column-rows="rightFixedColumnRows"
            :obj-data="objData"
            :columns-width="columnsWidth"
            :data="rebuildData"
          ></table-head>
        </div>
        <div
          :class="[prefixCls + '-fixed-body']"
          :style="fixedBodyStyle"
          ref="fixedRightBody"
          @mousewheel="handleFixedMousewheel"
          @DOMMouseScroll="handleFixedMousewheel"
        >
          <table-body
            fixed="right"
            :prefix-cls="prefixCls"
            :styleObject="fixedRightTableStyle"
            :columns="rightFixedColumns"
            :data="rebuildData"
            :columns-width="columnsWidth"
            :obj-data="objData"
          ></table-body>
        </div>
      </div>
      <div
        :class="[prefixCls + '-fixed-right-header']"
        :style="fixedRightHeaderStyle"
        v-if="isRightFixed"
      ></div>
      <div :class="[prefixCls + '-footer']" v-if="showSlotFooter" ref="footer">
        <slot name="footer"></slot>
      </div>
    </div>
    <!-- <Spin fix size="large" v-if="loading">
      <slot name="loading"></slot>
    </Spin>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from "vue-property-decorator";
import tableHead from "./xb-table-head.vue";
import tableBody from "./xb-table-body.vue";
// import Spin from "../spin/spin.vue";
import Csv from "src/utils/csv";
import { on, off } from "src/utils/utils";
import { getStyle, getScrollBarSize } from "src/utils/assist";
import cloneDeep from "lodash/cloneDeep";
import ExportCsv from "./export-csv";
import Locale from "src/mixins/locale";
import elementResizeDetectorMaker from "element-resize-detector";
import { getAllColumns, convertToRows, convertColumnOrder, getRandomStr } from "./util";

const prefixCls = "xbui-table";

let rowKey = 1;
let columnKey = 1;

@Component({ name: "XbTable", components: { tableHead, tableBody } })
export default class XbTable extends Mixins(Locale) {
  @Prop({
    type: Array,
    default: () => [],
  })
  data!: any[];

  @Prop({
    type: Array,
    default: () => [],
  })
  columns!: any[];
  /** 尺寸大小 */
  @Prop({
    type: String,
    default: "medium",
    validator(value) {
      return ["small", "medium", "large"].includes(value);
    },
  })
  size!: string;

  @Prop({
    type: [Number, String],
  })
  width!: number | string;

  @Prop({
    type: [Number, String],
  })
  height!: number | string;

  @Prop({
    type: Boolean,
    default: false,
  })
  stripe!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  border!: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  showHeader!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  highlightRow!: boolean;

  @Prop({
    type: Function,
    default: () => "",
  })
  // tslint:disable-next-line:ban-types
  rowClassName!: Function;

  @Prop({
    type: Object,
  })
  context!: object;

  @Prop({
    type: String,
  })
  noDataText!: string;

  @Prop({
    type: String,
  })
  noFilteredDataText!: string;

  @Prop({
    type: Boolean,
  })
  disabledHover!: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  loading!: boolean;

  /** data--START */

  colsWithId = this.makeColumnsId(this.columns);
  ready: boolean = false;
  tableWidth: number = 0;
  columnsWidth: object = {};
  prefixCls: string = prefixCls;
  compiledUids: any[] = [];
  objData: object = this.makeObjData(); // checkbox or highlight-row
  rebuildData: any[] = []; // for sort or filter
  cloneColumns: any[] = this.makeColumns(this.colsWithId);
  columnRows: any[] = convertToRows(this.colsWithId, false);
  leftFixedColumnRows: any[] = convertToRows(this.colsWithId, "left");
  rightFixedColumnRows: any[] = convertToRows(this.colsWithId, "right");
  // for multiple table-head, get columns that have no children
  allColumns: any[] = getAllColumns(this.colsWithId);
  showSlotHeader: boolean = true;
  showSlotFooter: boolean = true;
  bodyHeight: number = 0;
  scrollBarWidth: number = getScrollBarSize(false);
  currentContext: object = this.context;
  // when Cell has a button to delete row data, clickCurrentRow will throw an error, so clone a data
  cloneData: any[] = cloneDeep(this.data);
  showVerticalScrollBar: boolean = false;
  showHorizontalScrollBar: boolean = false;
  headerWidth: number = 0;
  headerHeight: number = 0;

  /** data--END */

  /** computed--START */

  get localeNoDataText() {
    if (this.noDataText === undefined) {
      return this.t("i.table.noDataText");
    } else {
      return this.noDataText;
    }
  }
  get localeNoFilteredDataText() {
    if (this.noFilteredDataText === undefined) {
      return this.t("i.table.noFilteredDataText");
    } else {
      return this.noFilteredDataText;
    }
  }
  get wrapClasses(): [string, object] {
    return [
      `${prefixCls}-wrapper`,
      {
        [`${prefixCls}-hide`]: !this.ready,
        [`${prefixCls}-with-header`]: this.showSlotHeader,
        [`${prefixCls}-with-footer`]: this.showSlotFooter,
      },
    ];
  }
  get classes(): [string, object] {
    return [
      `${prefixCls}`,
      {
        [`${prefixCls}-${this.size}`]: !!this.size,
        [`${prefixCls}-border`]: this.border,
        [`${prefixCls}-stripe`]: this.stripe,
        [`${prefixCls}-with-fixed-top`]: !!this.height,
      },
    ];
  }
  get fixedHeaderClasses(): [string, object] {
    return [
      `${prefixCls}-fixed-header`,
      {
        [`${prefixCls}-fixed-header-with-empty`]: !this.rebuildData.length,
      },
    ];
  }
  get styles(): CSSStyleDeclaration {
    const style: CSSStyleDeclaration = {} as CSSStyleDeclaration;
    if (this.height) {
      const height = parseInt(this.height + "", 10);
      style.height = `${height}px`;
    }
    if (this.width) {
      style.width = `${this.width}px`;
    }
    return style;
  }
  get tableStyle(): CSSStyleDeclaration {
    const style: CSSStyleDeclaration = {} as CSSStyleDeclaration;
    if (this.tableWidth !== 0) {
      let width = 0;
      if (this.bodyHeight === 0) {
        width = this.tableWidth;
      } else {
        width = this.tableWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0);
      }
      // const width = this.bodyHeight === 0 ? this.tableWidth : this.tableWidth - this.scrollBarWidth;
      style.width = `${width}px`;
    }
    return style;
  }
  get tableHeaderStyle() {
    const style: CSSStyleDeclaration = {} as CSSStyleDeclaration;
    if (this.tableWidth !== 0) {
      style.width = `${this.tableWidth}px`;
    }
    return style;
  }
  get fixedTableStyle() {
    const style: CSSStyleDeclaration = {} as CSSStyleDeclaration;
    let width = 0;
    this.leftFixedColumns.forEach((col) => {
      if (col.fixed && col.fixed === "left") {
        width += col._width;
      }
    });
    style.width = `${width}px`;
    return style;
  }
  get fixedRightTableStyle() {
    const style: CSSStyleDeclaration = {} as CSSStyleDeclaration;
    let width = 0;
    this.rightFixedColumns.forEach((col) => {
      if (col.fixed && col.fixed === "right") {
        width += col._width;
      }
    });
    // width += this.scrollBarWidth;
    style.width = `${width}px`;
    style.right = `${this.showVerticalScrollBar ? this.scrollBarWidth : 0}px`;
    return style;
  }
  get fixedRightHeaderStyle() {
    const style: CSSStyleDeclaration = {} as CSSStyleDeclaration;
    let width = 0;
    const height = this.headerHeight + 1;
    if (this.showVerticalScrollBar) {
      width = this.scrollBarWidth;
    }
    style.width = `${width}px`;
    style.height = `${height}px`;
    return style;
  }
  get bodyStyle() {
    const style: CSSStyleDeclaration = {} as CSSStyleDeclaration;
    if (this.bodyHeight !== 0) {
      const height = this.bodyHeight;
      style.height = `${height}px`;
    }
    return style;
  }
  get fixedBodyStyle() {
    const style: CSSStyleDeclaration = {} as CSSStyleDeclaration;
    if (this.bodyHeight !== 0) {
      const height = this.bodyHeight - (this.showHorizontalScrollBar ? this.scrollBarWidth : 0);
      style.height = this.showHorizontalScrollBar ? `${height}px` : `${height - 1}px`;
    }
    return style;
  }
  get leftFixedColumns() {
    return convertColumnOrder(this.cloneColumns, "left");
  }
  get rightFixedColumns() {
    return convertColumnOrder(this.cloneColumns, "right");
  }
  get isLeftFixed() {
    return this.columns.some((col) => col.fixed && col.fixed === "left");
  }
  get isRightFixed() {
    return this.columns.some((col) => col.fixed && col.fixed === "right");
  }
  /** computed--END */

  /** methods--START */
  rowClsName(index) {
    return this.rowClassName(this.data[index], index);
  }
  handleResize() {
    // let tableWidth = parseInt(getStyle(this.$el, 'width')) - 1;
    const tableWidth = this.$el.offsetWidth - 1;
    const columnsWidth = {};
    let sumMinWidth = 0;
    const hasWidthColumns: any[] = [];
    const noWidthColumns: any[] = [];
    const maxWidthColumns: any[] = [];
    const noMaxWidthColumns: any[] = [];
    this.cloneColumns.forEach((col) => {
      if (col.width) {
        hasWidthColumns.push(col);
      } else {
        noWidthColumns.push(col);
        if (col.minWidth) {
          sumMinWidth += col.minWidth;
        }
        if (col.maxWidth) {
          maxWidthColumns.push(col);
        } else {
          noMaxWidthColumns.push(col);
        }
      }
      col._width = null;
    });

    const unUsableWidth = hasWidthColumns.map((cell) => cell.width).reduce((a, b) => a + b, 0);
    let usableWidth =
      tableWidth - unUsableWidth - sumMinWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0) - 1;
    let usableLength = noWidthColumns.length;
    let columnWidth = 0;
    if (usableWidth > 0 && usableLength > 0) {
      columnWidth = usableWidth / usableLength;
    }

    for (const column of this.cloneColumns) {
      let width = columnWidth + (column.minWidth ? column.minWidth : 0);
      if (column.width) {
        width = column.width;
      } else {
        if (column._width) {
          width = column._width;
        } else {
          if (column.minWidth > width) {
            width = column.minWidth;
          } else if (column.maxWidth < width) {
            width = column.maxWidth;
          }

          if (usableWidth > 0) {
            usableWidth -= width - (column.minWidth ? column.minWidth : 0);
            usableLength--;
            if (usableLength > 0) {
              columnWidth = usableWidth / usableLength;
            } else {
              columnWidth = 0;
            }
          } else {
            columnWidth = 0;
          }
        }
      }

      column._width = width;

      columnsWidth[column._index] = {
        width,
      };
    }
    if (usableWidth > 0) {
      usableLength = noMaxWidthColumns.length;
      columnWidth = usableWidth / usableLength;
      for (const column of noMaxWidthColumns) {
        const width = column._width + columnWidth;
        if (usableLength > 1) {
          usableLength--;
          usableWidth -= columnWidth;
          columnWidth = usableWidth / usableLength;
        } else {
          columnWidth = 0;
        }

        column._width = width;

        columnsWidth[column._index] = {
          width,
        };
      }
    }

    this.tableWidth =
      this.cloneColumns.map((cell) => cell._width).reduce((a, b) => a + b, 0) +
      (this.showVerticalScrollBar ? this.scrollBarWidth : 0) +
      1;
    this.columnsWidth = columnsWidth;
    this.fixedHeader();
  }
  handleMouseIn(index) {
    if (this.disabledHover) {
      return;
    }
    if (this.objData[index]._isHover) {
      return;
    }
    this.objData[index]._isHover = true;
  }
  handleMouseOut(index) {
    if (this.disabledHover) {
      return;
    }
    this.objData[index]._isHover = false;
  }
  // 通用处理 highlightCurrentRow 和 clearCurrentRow
  handleCurrentRow(type, index?) {
    let oldIndex = -1;
    for (const i in this.objData) {
      if (this.objData[i]._isHighlight) {
        oldIndex = parseInt(i, 10);
        this.objData[i]._isHighlight = false;
      }
    }
    if (type === "highlight") {
      this.objData[index]._isHighlight = true;
    }
    const oldData = oldIndex < 0 ? null : JSON.parse(JSON.stringify(this.cloneData[oldIndex]));
    const newData = type === "highlight" ? JSON.parse(JSON.stringify(this.cloneData[index])) : null;
    this.$emit("on-current-change", newData, oldData);
  }
  highlightCurrentRow(index) {
    if (!this.highlightRow || this.objData[index]._isHighlight) {
      return;
    }
    this.handleCurrentRow("highlight", index);
  }
  clearCurrentRow() {
    if (!this.highlightRow) {
      return;
    }
    this.handleCurrentRow("clear");
  }
  clickCurrentRow(index) {
    this.highlightCurrentRow(index);
    this.$emit("on-row-click", JSON.parse(JSON.stringify(this.cloneData[index])), index);
  }
  dblclickCurrentRow(index) {
    this.highlightCurrentRow(index);
    this.$emit("on-row-dblclick", JSON.parse(JSON.stringify(this.cloneData[index])), index);
  }
  getSelection() {
    const selectionIndexes: any[] = [];
    for (const i in this.objData) {
      if (this.objData[i]._isChecked) {
        selectionIndexes.push(parseInt(i, 10));
      }
    }
    return JSON.parse(JSON.stringify(this.data.filter((data, index) => selectionIndexes.indexOf(index) > -1)));
  }
  toggleSelect(index) {
    let data: any = {};

    for (let i in this.objData) {
      if (parseInt(i, 10) === index) {
        data = this.objData[i];
        break;
      }
    }
    const status = !data._isChecked;

    this.objData[index]._isChecked = status;

    const selection = this.getSelection();
    this.$emit(status ? "on-select" : "on-select-cancel", selection, JSON.parse(JSON.stringify(this.data[index])));
    this.$emit("on-selection-change", selection);
  }
  toggleExpand(index) {
    let data: any = {};

    for (const i in this.objData) {
      if (parseInt(i, 10) === index) {
        data = this.objData[i];
        break;
      }
    }
    const status = !data._isExpanded;
    this.objData[index]._isExpanded = status;
    this.$emit("on-expand", JSON.parse(JSON.stringify(this.cloneData[index])), status);
  }
  selectAll(status) {
    for (const data of this.rebuildData) {
      if (this.objData[data._index]._isDisabled) {
        continue;
      } else {
        this.objData[data._index]._isChecked = status;
      }
    }
    const selection = this.getSelection();
    if (status) {
      this.$emit("on-select-all", selection);
    }
    this.$emit("on-selection-change", selection);
  }

  fixedHeader() {
    if (this.height) {
      this.$nextTick(() => {
        const titleHeight = parseInt(getStyle(this.$refs.title as HTMLElement, "height"), 10) || 0;
        const headerHeight = parseInt(getStyle(this.$refs.header as HTMLElement, "height"), 10) || 0;
        const footerHeight = parseInt(getStyle(this.$refs.footer as HTMLElement, "height"), 10) || 0;
        this.bodyHeight = Number(this.height) - titleHeight - headerHeight - footerHeight;
        this.$nextTick(() => this.fixedBody());
      });
    } else {
      this.bodyHeight = 0;
      this.$nextTick(() => this.fixedBody());
    }
  }
  fixedBody() {
    if (this.$refs.header) {
      this.headerWidth = this.$refs.header.children[0].offsetWidth;
      this.headerHeight = this.$refs.header.children[0].offsetHeight;
    }

    if (!this.$refs.tbody || !this.data || this.data.length === 0) {
      this.showVerticalScrollBar = false;
    } else {
      const bodyContentEl = this.$refs.tbody.$el;
      const bodyEl = bodyContentEl.parentElement;
      const bodyContentHeight = bodyContentEl.offsetHeight;
      const bodyHeight = bodyEl.offsetHeight;

      this.showHorizontalScrollBar =
        bodyEl.offsetWidth < bodyContentEl.offsetWidth + (this.showVerticalScrollBar ? this.scrollBarWidth : 0);
      this.showVerticalScrollBar = this.bodyHeight
        ? bodyHeight - (this.showHorizontalScrollBar ? this.scrollBarWidth : 0) < bodyContentHeight
        : false;

      if (this.showVerticalScrollBar) {
        bodyEl.classList.add(this.prefixCls + "-overflowY");
      } else {
        bodyEl.classList.remove(this.prefixCls + "-overflowY");
      }
      if (this.showHorizontalScrollBar) {
        bodyEl.classList.add(this.prefixCls + "-overflowX");
      } else {
        bodyEl.classList.remove(this.prefixCls + "-overflowX");
      }
    }
  }

  hideColumnFilter() {
    this.cloneColumns.forEach((col) => (col._filterVisible = false));
  }
  handleBodyScroll(event) {
    if (this.showHeader) {
      this.$refs.header.scrollLeft = event.target.scrollLeft;
    }
    if (this.isLeftFixed) {
      this.$refs.fixedBody.scrollTop = event.target.scrollTop;
    }
    if (this.isRightFixed) {
      this.$refs.fixedRightBody.scrollTop = event.target.scrollTop;
    }
    this.hideColumnFilter();
  }
  handleFixedMousewheel(event) {
    let deltaY = event.deltaY;
    if (!deltaY && event.detail) {
      deltaY = event.detail * 40;
    }
    if (!deltaY && event.wheelDeltaY) {
      deltaY = -event.wheelDeltaY;
    }
    if (!deltaY && event.wheelDelta) {
      deltaY = -event.wheelDelta;
    }
    if (!deltaY) {
      return;
    }
    const body = this.$refs.body;
    const currentScrollTop = body.scrollTop;
    if (deltaY < 0 && currentScrollTop !== 0) {
      event.preventDefault();
    }
    if (deltaY > 0 && body.scrollHeight - body.clientHeight > currentScrollTop) {
      event.preventDefault();
    }
    //body.scrollTop += deltaY;
    let step = 0;
    const timeId = setInterval(() => {
      step += 5;
      if (deltaY > 0) {
        body.scrollTop += 2;
      } else {
        body.scrollTop -= 2;
      }
      if (step >= Math.abs(deltaY)) {
        clearInterval(timeId);
      }
    }, 5);
  }
  handleMouseWheel(event) {
    const deltaX = event.deltaX;
    const $body = this.$refs.body;

    if (deltaX > 0) {
      $body.scrollLeft = $body.scrollLeft + 10;
    } else {
      $body.scrollLeft = $body.scrollLeft - 10;
    }
  }
  sortData(data, type, index) {
    const key = this.cloneColumns[index].key;
    data.sort((a, b) => {
      if (this.cloneColumns[index].sortMethod) {
        return this.cloneColumns[index].sortMethod(a[key], b[key], type);
      } else {
        if (type === "asc") {
          return a[key] > b[key] ? 1 : -1;
        } else if (type === "desc") {
          return a[key] < b[key] ? 1 : -1;
        }
      }
    });
    return data;
  }
  handleSort(idx, type) {
    const index = this.GetOriginalIndex(idx);
    this.cloneColumns.forEach((col) => (col._sortType = "normal"));

    const key = this.cloneColumns[index].key;
    if (this.cloneColumns[index].sortable !== "custom") {
      // custom is for remote sort
      if (type === "normal") {
        this.rebuildData = this.makeDataWithFilter();
      } else {
        this.rebuildData = this.sortData(this.rebuildData, type, index);
      }
    }
    this.cloneColumns[index]._sortType = type;

    this.$emit("on-sort-change", {
      column: JSON.parse(JSON.stringify(this.allColumns[this.cloneColumns[index]._index])),
      key,
      order: type,
    });
  }
  handleFilterHide(index) {
    // clear checked that not filter now
    if (!this.cloneColumns[index]._isFiltered) {
      this.cloneColumns[index]._filterChecked = [];
    }
  }
  filterData(data, column) {
    return data.filter((row) => {
      // 如果定义了远程过滤方法则忽略此方法
      if (typeof column.filterRemote === "function") {
        return true;
      }

      let status = !column._filterChecked.length;
      for (const checked of column._filterChecked) {
        status = column.filterMethod(checked, row);
        if (status) {
          break;
        }
      }
      return status;
    });
  }
  filterOtherData(data, index) {
    const column = this.cloneColumns[index];
    if (typeof column.filterRemote === "function") {
      column.filterRemote.call(this.$parent, column._filterChecked, column.key, column);
    }

    this.cloneColumns.forEach((col, colIndex) => {
      if (colIndex !== index) {
        data = this.filterData(data, col);
      }
    });
    return data;
  }
  handleFilter(index) {
    const column = this.cloneColumns[index];
    let filterData = this.makeDataWithSort();

    // filter others first, after filter this column
    filterData = this.filterOtherData(filterData, index);
    this.rebuildData = this.filterData(filterData, column);

    this.cloneColumns[index]._isFiltered = true;
    this.cloneColumns[index]._filterVisible = false;
    this.$emit("on-filter-change", column);
  }
  /**
   * #2832
   * 应该区分当前表头的 column 是左固定还是右固定
   * 否则执行到 $parent 时，方法的 index 与 cloneColumns 的 index 是不对应的
   * 左固定和右固定，要区分对待
   * 所以，此方法用来获取正确的 index
   */
  GetOriginalIndex(index) {
    return this.cloneColumns.findIndex((item) => item._index === index);
  }
  handleFilterSelect(idx, value) {
    const index = this.GetOriginalIndex(idx);
    this.cloneColumns[index]._filterChecked = [value];
    this.handleFilter(index);
  }
  handleFilterReset(idx) {
    const index = this.GetOriginalIndex(idx);
    this.cloneColumns[index]._isFiltered = false;
    this.cloneColumns[index]._filterVisible = false;
    this.cloneColumns[index]._filterChecked = [];

    let filterData = this.makeDataWithSort();
    filterData = this.filterOtherData(filterData, index);
    this.rebuildData = filterData;
    this.$emit("on-filter-change", this.cloneColumns[index]);
  }
  makeData() {
    const data = cloneDeep(this.data);
    data.forEach((row, index) => {
      row._index = index;
      row._rowKey = rowKey++;
    });
    return data;
  }
  makeDataWithSort() {
    let data = this.makeData();
    let sortType = "normal";
    let sortIndex = -1;
    let isCustom = false;

    for (let i = 0; i < this.cloneColumns.length; i++) {
      if (this.cloneColumns[i]._sortType !== "normal") {
        sortType = this.cloneColumns[i]._sortType;
        sortIndex = i;
        isCustom = this.cloneColumns[i].sortable === "custom";
        break;
      }
    }
    if (sortType !== "normal" && !isCustom) {
      data = this.sortData(data, sortType, sortIndex);
    }
    return data;
  }
  makeDataWithFilter() {
    let data = this.makeData();
    this.cloneColumns.forEach((col) => (data = this.filterData(data, col)));
    return data;
  }
  makeDataWithSortAndFilter() {
    let data = this.makeDataWithSort();
    this.cloneColumns.forEach((col) => (data = this.filterData(data, col)));
    return data;
  }
  makeObjData() {
    const data = {};
    this.data.forEach((row, index) => {
      const newRow = cloneDeep(row); // todo 直接替换
      newRow._isHover = false;
      if (newRow._disabled) {
        newRow._isDisabled = newRow._disabled;
      } else {
        newRow._isDisabled = false;
      }
      if (newRow._checked) {
        newRow._isChecked = newRow._checked;
      } else {
        newRow._isChecked = false;
      }
      if (newRow._expanded) {
        newRow._isExpanded = newRow._expanded;
      } else {
        newRow._isExpanded = false;
      }
      if (newRow._highlight) {
        newRow._isHighlight = newRow._highlight;
      } else {
        newRow._isHighlight = false;
      }
      data[index] = newRow;
    });
    return data;
  }
  // 修改列，设置一个隐藏的 id，便于后面的多级表头寻找对应的列，否则找不到
  makeColumnsId(columns) {
    return columns.map((item) => {
      if ("children" in item) {
        item.children = this.makeColumnsId(item.children);
      }
      item.__id = getRandomStr(6);
      return item;
    });
  }
  makeColumns(cols) {
    // 在 data 时，this.allColumns 暂时为 undefined
    const columns = cloneDeep(getAllColumns(cols));
    const left: any[] = [];
    const right: any[] = [];
    const center: any[] = [];

    columns.forEach((column, index) => {
      column._index = index;
      column._columnKey = columnKey++;
      column._width = column.width ? column.width : ""; // update in handleResize()
      column._sortType = "normal";
      column._filterVisible = false;
      column._isFiltered = false;
      column._filterChecked = [];

      if ("filterMultiple" in column) {
        column._filterMultiple = column.filterMultiple;
      } else {
        column._filterMultiple = true;
      }
      if ("filteredValue" in column) {
        column._filterChecked = column.filteredValue;
        column._isFiltered = true;
      }

      if ("sortType" in column) {
        column._sortType = column.sortType;
      }

      if (column.fixed && column.fixed === "left") {
        left.push(column);
      } else if (column.fixed && column.fixed === "right") {
        right.push(column);
      } else {
        center.push(column);
      }
    });
    return left.concat(center).concat(right);
  }
  // create a multiple table-head
  makeColumnRows(fixedType, cols) {
    return convertToRows(cols, fixedType);
  }
  exportCsv(params) {
    if (params.filename) {
      if (params.filename.indexOf(".csv") === -1) {
        params.filename += ".csv";
      }
    } else {
      params.filename = "table.csv";
    }

    let columns: any[] = [];
    let datas: any[] = [];
    if (params.columns && params.data) {
      columns = params.columns;
      datas = params.data;
    } else {
      columns = this.allColumns;
      if (!("original" in params)) {
        params.original = true;
      }
      datas = params.original ? this.data : this.rebuildData;
    }

    let noHeader = false;
    if ("noHeader" in params) {
      noHeader = params.noHeader;
    }

    const data = Csv(columns, datas, params, noHeader);
    if (params.callback) {
      params.callback(data);
    } else {
      ExportCsv.download(params.filename, data);
    }
  }

  created() {
    if (!this.context) {
      this.currentContext = this.$parent;
    }
    this.showSlotHeader = this.$slots.header !== undefined;
    this.showSlotFooter = this.$slots.footer !== undefined;
    this.rebuildData = this.makeDataWithSortAndFilter();
  }
  mounted() {
    this.handleResize();
    this.$nextTick(() => (this.ready = true));

    on(window, "resize", this.handleResize);
    this.observer = elementResizeDetectorMaker();
    this.observer.listenTo(this.$el, this.handleResize);

    this.$on("on-visible-change", (val) => {
      if (val) {
        this.handleResize();
      }
    });
  }
  beforeDestroy() {
    off(window, "resize", this.handleResize);
    this.observer.removeListener(this.$el, this.handleResize);
  }
  /** methods--END */
}
</script>
