<template>
<div>

  <div :style="{width: width +'px'}" style="position: relative;" v-clickoutside="handleClose">
    <!-- 输入框 -->
    <div :class='classesDiv' @click="toggleMenu()">
      <div :class='classesInput'>
        <!-- 搜索框 -->
        <span :class='classesInputShow' v-if="!valueMultiple.length" @keyup="getValue(textValue)" :readonly='readonlyShow'>{{textValue?textValue:placeHolder}}</span>
        <!-- 多选数据 展示 -->
        <div style="line-height: 19px;" v-if="valueMultiple.length">
          <span :class='classesMultiple' v-for="itemMultiple in valueMultiple">
            <span :class='classesMultipleShow'>{{itemMultiple}}</span>
            <i :class='classesMultipleIcon' @click="clearMultipleValue($event,itemMultiple)"></i>
          </span>
        </div>
        <!-- icon显示 -->
        <i :class='[classesIcon,(this.multiple && valueMultiple.length>2)?`xbui-select-icon-multiple`:``]' @click="clearValue"></i>
      </div>
    </div>
    <!-- 筛选框 -->
    <div :class='classesSelectDiv' v-if="toggleMenuShow" :style="{width: width +'px'}">
      <ul :class='classesSelectUl'>
        <!-- 不分组 -->
        <li v-for="item in selectArray" v-if="!item.group" :class='[classesSelectLi,item.disabled?classesSelectDisabled:""]' @click="toggleMenuLi(item)">
          <span :class='classesSelectLiSpan' v-bind:style="{ textAlign: item.value==notFoundText?'center':'' }">{{item.value}}</span>
          <i :class='classesSelectLiIcon' v-if="item.isCheck"></i>
        </li>
        <!-- 分组 -->
        <ul v-if="item.group&&item.group.length!=0" :class='[item.group?classesSelectLiGroup:""]' v-for="item in selectArray">
          <li :class='[classesSelectLi,classesSelectLiGroupTitle]'>{{item.title}}</li>
          <li :class='[itemGroup.disabled?classesSelectDisabled:"",classesSelectLi,classesSelectLiGroupContent]' v-for="itemGroup in item.group" @click="toggleMenuLi(itemGroup,item)">
            <span :class='classesSelectLiSpan'>{{itemGroup.value}}</span>
            <i :class='classesSelectLiIcon' v-if="itemGroup.isCheck"></i>
          </li>
        </ul>
      </ul>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import clickoutside from "src/directives/clickoutside";
const prefixCls = "xbui-select";
@Component({ name: "XbSelect", directives: { clickoutside } })
export default class XbSelect extends Vue {
  // 默认文案
  @Prop({ default: "请选择..." })
  placeHolder!: string;

  // 将被选中的数据，在初始化前就展示出来
  @Prop({ default: "" })
  inputValue!: any;

  // 数组
  @Prop({ default: "" })
  options!: any;

  // 禁用状态
  @Prop({ default: false })
  disabled!: boolean;

  // 可清空单选
  @Prop({ default: false })
  clearable!: boolean;

  // 多选
  @Prop({ default: false })
  multiple!: boolean;

  // 可搜索
  @Prop({ default: false })
  filterable!: boolean;

  // 当下拉列表为空时显示的内容
  @Prop({ default: "无匹配数据" })
  notFoundText!: string;

  /** input 宽度样式 */
  @Prop({ default: 240 })
  width!: number;

  /** 输入框尺寸，组件内提供3种 */
  @Prop({ default: "medium" })
  size!: string;

  /** 输入框，无边框样式展示 */
  @Prop({ default: true })
  borderShow!: boolean;

  readonlyShow: boolean = !this.filterable;
  toggleMenuShow: boolean = false;
  textValue: string = typeof this.inputValue === "string" ? this.inputValue : "";
  valueMultiple: any = typeof this.inputValue === "object" ? this.inputValue : [];
  selectArray: any = this.options;

  get classesWholeDiv() {
    return [`${prefixCls}-whole-div`];
  }
  // 输入框
  get classesDiv() {
    return [`${prefixCls}-div`];
  }
  get classesInput() {
    return [
      `${prefixCls}-input`,
      {
        [`${prefixCls}-input-border`]: this.borderShow,
        [`${prefixCls}-input-multiple`]: this.multiple,
        [`${prefixCls}-input-disabled`]: this.disabled,
        [`${prefixCls}-input-large`]: this.size === "large",
        [`${prefixCls}-input-medium`]: this.size === "medium" || !this.size,
        [`${prefixCls}-input-small`]: this.size === "small",
      },
    ];
  }
  get classesInputShow() {
    return [
      `${prefixCls}-input-show`,
      {
        [`${prefixCls}-input-show-border`]: this.borderShow,
        [`${prefixCls}-input-disabled-show`]: this.disabled,
      },
    ];
  }
  get classesMultiple() {
    return [`${prefixCls}-multiple`];
  }
  get classesMultipleShow() {
    return [`${prefixCls}-multiple-show`];
  }
  get classesMultipleIcon() {
    return [`${prefixCls}-multiple-icon`, `xb-icon-circle-close`];
  }
  get classesIcon() {
    return [
      `${prefixCls}-icon`,
      {
        [`xb-icon-caret-bottom`]: !this.toggleMenuShow,
        [`xb-icon-caret-top`]: this.toggleMenuShow,
        [`xb-icon-circle-close`]: this.clearable && this.textValue && this.toggleMenuShow,
        [`${prefixCls}-icon-gray`]: this.clearable && this.textValue && this.toggleMenuShow,
      },
    ];
  }
  // 筛选框
  get classesSelectDiv() {
    return [`${prefixCls}-select-div`];
  }
  get classesSelectUl() {
    return [`${prefixCls}-select-ul`];
  }
  get classesSelectLi() {
    return [`${prefixCls}-select-li`];
  }
  get classesSelectLiSpan() {
    return [`${prefixCls}-select-li-span`];
  }
  get classesSelectDisabled() {
    return [`${prefixCls}-select-disabled`];
  }
  get classesSelectLiGroup() {
    return [`${prefixCls}-select-li-group`];
  }
  get classesSelectLiGroupTitle() {
    return [`${prefixCls}-select-li-group-title`];
  }
  get classesSelectLiGroupContent() {
    return [`${prefixCls}-select-li-group-content`];
  }
  get classesSelectLiIcon() {
    return [`${prefixCls}-select-li-icon xb-icon-check`];
  }

  // 点击展开、收缩 数据框
  toggleMenu(e) {
    // console.log(this.$refs.menu);
    if (!this.disabled) {
      if (!this.clearable || (this.clearable && !this.toggleMenuShow)) {
        if (this.toggleMenuShow) {
          // 收拢筛选框
          this.toggleMenuShow = false;
        } else {
          // 打开筛选框
          this.toggleMenuShow = true;
          this.selectArray.map((re) => {
            if (re.title) {
              // 分组
            } else {
              // 不分组
              if (typeof this.inputValue === "string") {
                // 单选
                if (re.value === this.inputValue) {
                  re.isCheck = true;
                }
              } else {
                // 多选
                this.inputValue.forEach((ele) => {
                  if (re.value === ele) {
                    re.isCheck = true;
                  }
                });
              }
            }
          });
        }
      }
    }
  }
  // 选中一个筛选项
  toggleMenuLi(item, group) {
    // item：被点击的li的项目
    // group：分组的项目，所包含的title，group等信息
    if (!item.disabled) {
      if (this.multiple) {
        // 多选
        if (item.isCheck) {
          // 清除所选项
          const indexNum = this.valueMultiple.indexOf(item.value);
          if (indexNum !== -1) {
            this.valueMultiple.splice(indexNum, 1);
            item.isCheck = false;
          }
        } else {
          // 添加所选项
          this.valueMultiple.push(item.value);
          item.isCheck = true;
        }
      } else {
        // 单选
        this.selectArray.forEach((re) => {
          if (re.group) {
            re.group.forEach((ele) => {
              delete ele.isCheck;
            });
          } else {
            delete re.isCheck;
          }
        });

        this.toggleMenuShow = false;
        this.textValue = item.value;
        item.isCheck = true;
      }
      this.selectArray = this.options;
      this.readonlyShow = true;
    }
  }
  // 删除、清空 所选项
  clearValue() {
    if (this.textValue && this.toggleMenuShow) {
      this.textValue = "";
      this.selectArray.forEach((re) => {
        delete re.isCheck;
      });
    }
    this.readonlyShow = !this.filterable;
  }
  // 清除多选项
  clearMultipleValue(event, item) {
    // 结果清除选中
    const indexNum = this.valueMultiple.indexOf(item);
    if (indexNum !== -1) {
      this.valueMultiple.splice(indexNum, 1);
    }
    // 下拉框清除选中
    this.selectArray.forEach((re) => {
      if (re.group) {
        re.group.forEach((ele) => {
          if (item === ele.value) {
            delete ele.isCheck;
          }
        });
      } else {
        if (item === re.value) {
          delete re.isCheck;
        }
      }
    });
    if (this.valueMultiple.length === 0) {
      this.readonlyShow = !this.filterable;
    }
    event.stopPropagation();
  }
  // 搜索 筛选项 数据
  getValue(value) {
    this.selectArray = [];
    this.options.forEach((re) => {
      if (re.group) {
        // 分组
        const newArray = [];
        re.group.forEach((i) => {
          if (i.value.indexOf(value) !== -1) {
            newArray.push(i);
          }
        });
        if (newArray.length) {
          this.selectArray.push({
            title: re.title,
            group: newArray,
          });
        }
      } else {
        // 不分组
        if (re.value.indexOf(value) !== -1) {
          this.selectArray.push(re);
        }
      }
    });
    if (this.selectArray.length === 0) {
      this.selectArray.push({ value: this.notFoundText, isValue: false });
    }
  }

  handleClose() {
    // 点击外部空间，关闭筛选框
    this.toggleMenuShow = false;
  }
}
</script>
