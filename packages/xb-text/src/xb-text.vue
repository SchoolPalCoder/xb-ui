<template>
  <div :class="classesTextDiv">
    <input
      v-model="num"
      v-if="type !== 'textarea'"
      :style="inputStyle"
      :placeholder="placeHolder"
      :class='classesText'
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength?maxlength:''"
      @input="inputChange(num)"
    />

    <textarea
      v-model="textValue"
      v-if="type === 'textarea'"
      :style="{'height':heightNum+10+'px'}"
      :placeholder="placeHolder"
      :class='classesTextarea'
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength?maxlength:''"
      @input="textareaChange()"
    >
    </textarea>

    <!-- 清空按钮 -->
    <span
      v-if="status=='clearable'&&num&&!suffixIcon"
      :class='classedRightIcon'
      @click="clearClick()"
    >
      <i
        class="xb-icon-circle-close"
        :class='classesCloseIcon'
      ></i>
    </span>

    <!-- 状态为“成功” -->
    <span
      v-if="status=='success'&&!suffixIcon"
      :class='classedRightIcon'
    >
      <i
        class="xb-icon-circle-check"
        :class='classesSuccessIcon'
      ></i>
    </span>

    <!-- 状态为“失败” -->
    <span
      v-if="status=='fail'&&!suffixIcon"
      :class='classedRightIcon'
    >
      <i
        class="xb-icon-circle-close"
        :class='classesFailIcon'
      ></i>
    </span>

    <!-- 自定义样式，展示在首部 -->
    <span
      v-if="prefixIcon"
      :class='classedLeftIcon'
    >
      <i
        :class='prefixIcon'
        :style="iconStyle"
      ></i>
    </span>

    <!-- 自定义样式，展示在尾部 -->
    <span
      v-if="suffixIcon"
      :class='classedRightIcon'
    >
      <i
        :class='suffixIcon'
        :style="iconStyle"
      ></i>
    </span>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { clearTimeout } from "timers";
const prefixCls = "xbui-text";
@Component({ name: "XbText" })
export default class XbText extends Vue {
  /** 类型（默认为input，传值可允许为textarea） */
  @Prop({ default: "text" })
  type!: string;

  /** 初始值 */
  @Prop({ default: "请输入" })
  placeHolder!: string;

  /** 禁用 */
  @Prop({ default: false })
  disabled!: boolean;

  /** 禁用 */
  @Prop({ default: false })
  readonly!: boolean;

  /** 清空，成功，失败状态 */
  @Prop({ default: "" })
  status!: string;

  /** 首部 增加自定义的icon图标 */
  @Prop({ default: "" })
  prefixIcon!: string;

  /** 尾部 增加自定义的icon图标 */
  @Prop({ default: "" })
  suffixIcon!: string;

  /** 对icon样式进行处理（只有在有存在icon的时候，此参数才会有用） */
  @Prop()
  iconStyle!: object;

  /** input样式 */
  @Prop()
  inputStyle!: object;

  /** 输入框尺寸，组件内提供3种 */
  @Prop({ default: "medium" })
  size!: string;

  /** 可输入的最大字符串长度 */
  @Prop()
  maxlength!: number;

  /** 最大值 */
  @Prop()
  maxNum!: number;

  /** 正则表达式 */
  @Prop()
  regExp!: string;

  /** textarea 展示行数 */
  @Prop({ default: 2 })
  rows!: number;

  /** textarea 展示行数 */
  @Prop({ default: false })
  autosize!: boolean | object;

  num: any = "";
  textValue: any = "";
  showNum: number = 0;
  heightNum: number = this.rows * 20;

  // input实时输入处理
  inputChange(info) {
    if (this.maxNum) {
      // 如果存在最大值，则只允许输入纯数字
      const regNum = /^(0|[1-9]\d*)(\.\d{1,10000}?)?$/;

      // 存在正则
      if (this.regExp) {
        if (new RegExp(this.regExp).test(info) && new RegExp(regNum).test(info)) {
          if (info > this.maxNum) {
            this.num = this.showNum;
          } else {
            this.num = info;
            this.showNum = info;
          }
        } else {
          this.num = this.showNum;
        }
      } else {
        if (new RegExp(regNum).test(info)) {
          // 数字
          if (info > this.maxNum) {
            this.num = this.showNum;
          } else {
            this.num = info;
            this.showNum = info;
          }
        } else {
          // 非数字
          this.num = this.showNum;
        }
      }
    } else if (this.regExp) {
      if (new RegExp(this.regExp).test(info)) {
        this.num = info;
        this.showNum = info;
      } else {
        this.num = info ? this.showNum : "";
      }
    }
  }

  // textarea实时输入处理
  textareaChange() {
    if (this.autosize === true) {
      let textareaHtml;
      textareaHtml = this.$el.querySelector("textarea");
      // 滚动高度
      let _scrollHeight = 0;
      _scrollHeight = textareaHtml.scrollHeight;
      if (_scrollHeight - this.heightNum > 10) {
        // 修改页面高度
        this.heightNum = _scrollHeight;
      }
    } else if (typeof this.autosize === "object" && Array.isArray(this.autosize) === false) {
      // 传入的是一个obj对象，内含最小行数和最大行数
      let textareaHtml;
      textareaHtml = this.$el.querySelector("textarea");
      // 滚动高度
      let _scrollHeight = 0;
      _scrollHeight = textareaHtml.scrollHeight;
      if (_scrollHeight - this.heightNum > 10) {
        // 修改页面高度
        this.heightNum = _scrollHeight;
      }
      textareaHtml.style.minHeight = this.autosize.min * 20 + 10 + "px";
      textareaHtml.style.maxHeight = this.autosize.max * 20 + 10 + "px";
    }
  }

  // 清空输入内容
  clearClick() {
    this.num = "";
    this.showNum = 0;
  }

  // 样式
  get classesTextDiv() {
    return [`${prefixCls}-div`];
  }
  // input输入框
  get classesText() {
    return [
      `${prefixCls}-input`,
      {
        [`${prefixCls}-input-large`]: this.size === "large",
        [`${prefixCls}-input-medium`]: this.size === "medium",
        [`${prefixCls}-input-small`]: this.size === "small",
        [`${prefixCls}-disabled`]: this.disabled,
        [`${prefixCls}-clearable`]: this.status === "clearable",
        [`${prefixCls}-fail-input`]: this.status === "fail" && !this.suffixIcon,
        [`${prefixCls}-left-input`]: this.prefixIcon,
        [`${prefixCls}-right-input`]:
          this.suffixIcon || this.status === "clearable" || this.status === "success" || this.status === "fail",
      },
    ];
  }
  // textarea输入框
  get classesTextarea() {
    return [
      `${prefixCls}-input`,
      `${prefixCls}-textarea`,
      {
        [`${prefixCls}-disabled`]: this.disabled,
      },
    ];
  }
  // 左侧icon
  get classedLeftIcon() {
    return [`${prefixCls}-left-icon`];
  }
  // 右侧icon
  get classedRightIcon() {
    return [`${prefixCls}-right-icon`];
  }
  // 清空
  get classesCloseIcon() {
    return [`${prefixCls}-close-icon`];
  }
  // 成功
  get classesSuccessIcon() {
    return [`${prefixCls}-success-icon`];
  }
  // 失败
  get classesFailIcon() {
    return [`${prefixCls}-fail-icon`];
  }
}
</script>
