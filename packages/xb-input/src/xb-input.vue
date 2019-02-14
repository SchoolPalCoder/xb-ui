<template>
  <div :class="classesTextDiv">
    <input
      v-if="type !== 'textarea'"
      ref="input"
      :value="nativeInputValue"
      :type="type"
      :style="inputStyle"
      :placeholder="placeHolder"
      :class="classesText"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength?maxlength:''"
      @input="inputChange"
    >

    <textarea
      v-else
      ref="textarea"
      :value="nativeInputValue"
      :style="{'height':heightNum+10+'px'}"
      :placeholder="placeHolder"
      :class="classesTextarea"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength?maxlength:''"
      @input="textareaChange"
    ></textarea>

    <!-- 清空按钮 -->
    <span @click="clearClick">
      <xb-icon
        v-if="status=='clearable'&&nativeInputValue&&!suffixIcon"
        :class="classedRightIcon"
        type="circle-close"
        color="#aaaaaa"
      ></xb-icon>
    </span>
    <!-- 状态为“成功” -->
    <xb-icon
      v-if="status=='success'&&!suffixIcon"
      :class="classedRightIcon"
      type="circle-check"
      color="#52c41a"
    ></xb-icon>

    <!-- 状态为“失败” -->
    <xb-icon
      v-if="status=='fail'&&!suffixIcon"
      :class="classedRightIcon"
      type="circle-close"
      color="#f5222d"
    ></xb-icon>

    <!-- 自定义样式，展示在首部 -->
    <xb-icon
      v-if="prefixIcon"
      :class="classedLeftIcon"
      :type="prefixIcon"
      :size="iconSize"
      :color="iconColor"
    ></xb-icon>

    <!-- 自定义样式，展示在尾部 -->
    <xb-icon
      v-if="suffixIcon"
      :class="classedRightIcon"
      :type="suffixIcon"
      :size="iconSize"
      :color="iconColor"
    ></xb-icon>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { clearTimeout } from "timers";
const prefixCls = "xbui-input";
@Component({ name: "XbInput" })
export default class XbInput extends Vue {
  /** 传入的model值，必传 */
  @Prop({ default: "" })
  value!: [string, number];

  /** 类型（默认为input，传值可允许为textarea） */
  @Prop({ default: "text", type: String })
  type!: string;

  /** 初始值 */
  @Prop({ default: "请输入", type: String })
  placeHolder!: string;

  /** 禁用 */
  @Prop({ default: false, type: Boolean })
  disabled!: boolean;

  /** 禁用 */
  @Prop({ default: false, type: Boolean })
  readonly!: boolean;

  /** 清空，成功，失败状态 */
  @Prop({ default: "", type: String })
  status!: string;

  /** 首部 增加自定义的icon图标 */
  @Prop({ default: "", type: String })
  prefixIcon!: string;

  /** 尾部 增加自定义的icon图标 */
  @Prop({ default: "", type: String })
  suffixIcon!: string;

  /** 对icon尺寸进行处理（只有在有存在icon的时候，此参数才会有用） */
  @Prop({ default: "", type: String })
  iconSize!: string;

  /** 对icon颜色进行处理（只有在有存在icon的时候，此参数才会有用） */
  @Prop({ default: "", type: String })
  iconColor!: string;

  /** input样式 */
  @Prop({ type: Object })
  inputStyle!: object;

  /** 输入框尺寸，组件内提供3种 */
  @Prop({ default: "medium", type: String })
  size!: string;

  /** 可输入的最大字符串长度 */
  @Prop({ type: Number })
  maxlength!: number;

  /** 最大值 */
  @Prop({ type: Number })
  maxNum!: number;

  /** 正则表达式 */
  @Prop({ type: String })
  regExp!: string;

  /** textarea 展示行数 */
  @Prop({ default: 2, type: Number })
  rows!: number;

  /** textarea 展示行数 */
  @Prop({ default: false, type: [Boolean, Object] })
  autosize!: boolean | object;

  nativeInputValue: any = this.value;
  showNum: any = "";
  heightNum: number = this.rows * 20;

  // 实时处理或者清空数据的时候，更新页面上的数据
  changeValue() {
    let input = this.$refs.input || this.$refs.textarea;
    input.value = this.nativeInputValue;
  }

  // input实时输入处理
  inputChange(event) {
    if (this.maxNum) {
      // 如果存在最大值，则只允许输入纯数字
      const regNum = /^(0|[1-9]\d*)(\.\d{1,10000}?)?$/;
      // 存在正则
      if (this.regExp) {
        if (new RegExp(this.regExp).test(event.target.value) && new RegExp(regNum).test(event.target.value)) {
          if (event.target.value > this.maxNum) {
            this.nativeInputValue = this.showNum;
          } else {
            this.nativeInputValue = event.target.value;
            this.showNum = event.target.value;
          }
        } else {
          this.nativeInputValue = this.showNum;
        }
      } else {
        if (new RegExp(regNum).test(event.target.value)) {
          // 数字
          if (event.target.value > this.maxNum) {
            this.nativeInputValue = this.showNum;
          } else {
            this.nativeInputValue = event.target.value;
            this.showNum = event.target.value;
          }
        } else {
          // 非数字
          this.nativeInputValue = this.showNum;
        }
      }
    } else if (this.regExp) {
      if (new RegExp(this.regExp).test(event.target.value)) {
        this.nativeInputValue = event.target.value;
        this.showNum = event.target.value;
      } else {
        this.nativeInputValue = event.target.value ? this.showNum : "";
      }
    } else {
      this.nativeInputValue = event.target.value;
    }
    this.$emit("input", this.nativeInputValue);
    this.$nextTick(() => {
      this.changeValue();
    });
  }

  // textarea实时输入处理
  textareaChange() {
    if (this.autosize === true) {
      let textareaHtml;
      textareaHtml = this.$el.querySelector("textarea");
      // 滚动高度
      let scrollHeight = 0;
      scrollHeight = textareaHtml.scrollHeight;
      if (scrollHeight - this.heightNum > 10) {
        // 修改页面高度
        this.heightNum = scrollHeight;
      }
    } else if (typeof this.autosize === "object" && Array.isArray(this.autosize) === false) {
      // 传入的是一个obj对象，内含最小行数和最大行数
      let textareaHtml;
      textareaHtml = this.$el.querySelector("textarea");
      // 滚动高度
      let scrollHeight = 0;
      scrollHeight = textareaHtml.scrollHeight;
      if (scrollHeight - this.heightNum > 10) {
        // 修改页面高度
        this.heightNum = scrollHeight;
      }
      textareaHtml.style.minHeight = this.autosize.min * 20 + 10 + "px";
      textareaHtml.style.maxHeight = this.autosize.max * 20 + 10 + "px";
    }
  }

  // 清空输入内容
  clearClick() {
    this.nativeInputValue = "";
    this.showNum = 0;
    this.$emit("input", this.nativeInputValue);
    this.$nextTick(() => {
      this.changeValue();
    });
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
        [`${prefixCls}-input-disabled`]: this.disabled,
        [`${prefixCls}-input-fail`]: this.status === "fail" && !this.suffixIcon,
        [`${prefixCls}-input-left`]: this.prefixIcon,
        [`${prefixCls}-input-right`]:
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
    return [
      `${prefixCls}-right-icon`,
      {
        [`${prefixCls}-close-icon`]: this.status === "clearable",
      },
    ];
  }
}
</script>
