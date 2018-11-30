<template>
  <div class="xbui-text-div">
    <input class="xbui-text" type="text" v-model="num" :style="inputStyle" :placeholder="placeHolder" :class="[disabled?'xbui-text-disabled':'',clearable?'xbui-text-clearable':'']" :disabled="disabled" :maxlength="maxlength?maxlength:''" @input="inputChange(num)" />
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class XbText extends Vue {
  /** 初始值 */
  @Prop({ default: "请输入" })
  placeHolder!: string;

  /**禁用 */
  @Prop({ default: false })
  disabled!: Boolean;

  /**input样式 */
  @Prop()
  inputStyle!: Object;

  /**可输入的最大字符串长度 */
  @Prop()
  maxlength!: number;

  /**可清除样式icon */
  @Prop({ default: false })
  clearable!: Boolean;

  /**最大值 */
  @Prop()
  maxNum!: number;

  /**正则表达式 */
  @Prop()
  regExp!: string;

  num: any = "";
  showNum: number = 0;

  // 实时输入处理
  inputChange(info) {
    if (this.maxNum) {
      // 如果存在最大值，则只允许输入纯数字
      let regNum = /^(-)?[0-9]*$/;
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
    }
  }

  // valueChange: '&?', //由ng-paste触发的回调函数
  // blur: '&?', //ng-blur触发的回调函数
  // keyboard: '&?', //用键盘控制光标，但是好像传个Boolean就可以了，有时间问问作者，我只是个写注释的
  // focus: '&?', //ng-focus触发的回到函数
  // className: '=?', //键盘控制光标所用到的属性，作用于特定类名的元素
  // regExp: "@?", //  reg-exp="^\d+(\.\d{0,2})?$" 正则表达式字符串，传值时会实时限制输入(不限制空数据)
  // maxLengthFun: '&?', //最大值可输入长度回调，适用于那些可输入最大值非固定的场景
  // error: '=?', //输入框输入错误时，框变红
  // isFocus: '<', //初始化是否自动聚焦
  // keyupAction: "&",
  // keydownAction: '&',
  // borderNone: '<?',//判断是否需要有border外框
}
</script>
