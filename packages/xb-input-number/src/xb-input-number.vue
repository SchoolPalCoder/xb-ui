<template>
  <div class="xbui-whole-div">
    <div class="xbui-input-div" :style="inputStyle">
      <!-- :是v-bind的缩写，是为了动态绑定数据。 -->
      <!-- @input：每次输入都触发相关函数，@change：鼠标焦点离开输入框时触发相关函数 -->
      <input class="xbui-input" type="text" v-model="num" :class="[disabled?'xbui-input-disabled':'']" :disabled="disabled" @input="inputChange(num)" @change="changeInput(num)" @focus="focus()" />
    </div>
    <span class="xbui-arrow-div">
      <!-- 添加 -->
      <span class="xbui-arrow xbui-arrow-down" :class="[disabled?'xbui-arrow-disabled':'']" @click="addValue(disabled?true:false)">+</span>
      <!-- 减少 -->
      <span class="xbui-arrow" :class="[disabled?'xbui-arrow-disabled':'']" @click="subtractValue(disabled?true:false)">-</span>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class XbInputNumber extends Vue {
  // 感叹号是非null和非undefined的类型断言，所以表示对该属性进行非空断言。
  /** 初始值 */
  @Prop({ default: 1 })
  firstNum!: number;

  /**最小值 */
  @Prop({ default: 0 })
  min!: number;

  /**最大值 */
  @Prop({ default: 1.7976931348623157e10308 })
  max!: number;

  /**步进 */
  @Prop({ default: 1 })
  step!: number;

  /**正则表达式 */
  @Prop()
  regExp!: string;

  /**input样式 */
  @Prop()
  inputStyle!: Object;

  /**禁用 */
  @Prop()
  disabled!: Boolean;

  /** 子组件内的初始值*/
  /** 由于firstNum是存在于props的，如果通过props传入的值，直接修改组件内容，vue2是会报错的
   解决方法：1、双向绑定数据 2、将firstNum赋值给num，而num作为组件的原生参数，存在于页面中*/
  num: number = this.firstNum;
  /**子组件内展示的数值，如果输入的数字不符合正则表达式，则展示原来的数值 */
  showNum: number = 0;

  // 增加步进
  addValue(state) {
    if (!state) {
      // 如果输入框内没有值，就默认为0
      this.num = this.num ? parseInt(String(this.num)) : 0;
      // inputNum作为暂时存在的数据
      let inputNum = 0;
      this.showNum = this.num;
      inputNum = this.num == this.max ? this.max : this.num + parseInt(String(this.step));
      // 获取数据后，原来的数据进行正则判断
      this.inputChange(inputNum);
    }
  }

  // 减少步进
  subtractValue(state) {
    if (!state) {
      // 如果输入框内没有值，就默认为0
      this.num = this.num ? parseInt(String(this.num)) : 0;
      // inputNum作为暂时存在的数据
      let inputNum = 0;
      this.showNum = this.num;
      inputNum = this.num == this.min ? this.min : this.num - parseInt(String(this.step));
      // 获取数据后，原来的数据进行正则判断
      this.inputChange(inputNum);
    }
  }

  // 正则处理
  inputChange(val) {
    // 只允许输入纯数字
    let regNum = /^(-)?[0-9]*$/;
    // 存在正则
    if (this.regExp) {
      if (new RegExp(this.regExp).test(val) && new RegExp(regNum).test(val)) {
        if (val > this.max || val < this.min) {
          this.num = this.showNum;
        } else {
          this.num = val;
          this.showNum = val;
        }
      } else {
        this.num = this.showNum;
      }
    } else {
      if (new RegExp(regNum).test(val)) {
        // 数字
        if (val > this.max || val < this.min) {
          this.num = this.showNum;
        } else {
          this.num = val;
          this.showNum = val;
        }
      } else {
        // 非数字
        this.num = this.showNum;
      }
    }
    this.changeInput(this.num);
  }

  focus() {
    // 光标点到输入框的时候，将原有的num先存储下来，以防用户输入非数字
    this.showNum = this.num;
  }

  // 光标离开input后触发相关函数
  changeInput(num) {
    // console.log(num);
  }

  // 将输入框内的数值修改为“数字”类型
  changeNumType(num) {
    num = parseInt(String(num));
  }
}
</script>