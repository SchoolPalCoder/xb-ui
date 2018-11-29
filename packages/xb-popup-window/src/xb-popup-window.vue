<template>
  <div v-if="visible">
    <div :class="maskClasses" @click="mask"></div>
    <div :class="wrapClasses">
      <div :class="classes" :style="mainStyles">
        <div :class="[prefixCls + '-content']">
          <a :class="[prefixCls + '-close']" v-if="closable" @click="close">
            <slot name="close">
              <xb-icon type="close"></xb-icon>
            </slot>
          </a>
          <div :class="[prefixCls + '-header']" v-if="showHead">
            <slot name="header">
              <div :class="[prefixCls + '-header-inner']">{{ title }}</div>
            </slot>
          </div>
          <div :class="[prefixCls + '-body']">
            <slot></slot>
          </div>
          <div :class="[prefixCls + '-footer']" v-if="!footerHide">
            <slot name="footer">
              <xb-button type="default" @click.native="ok">{{ localeOkText }}</xb-button>
              <xb-button type="reset" @click.native="cancel">{{ localeCancelText }}</xb-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch } from "vue-property-decorator";
import XbIcon from "../../xb-icon";
import XbButton from "../../xb-button";
import Locale from "../../../src/mixins/locale";
import Emmiter from "src/mixins/emitter";
import { debug } from "util";
import scrollbar from "./scrollbar";
const prefixCls = "xbui-popup-window";

@Component({
  name: "XbPopupWindow",
  mixins: [Emmiter, Locale, scrollbar],
  components: {
    XbIcon,
    XbButton,
  },
})
export default class XbPopupWindow extends Vue {
  // value 和ng-model绑定一起，通过这个值的存在来进行弹框的显示
  @Prop({ type: Boolean, default: false })
  value!: boolean;

  // 点击遮罩层是否可以关闭弹框
  @Prop({ type: Boolean, default: true })
  maskClosable!: boolean;

  // 控制右上角关闭按钮是否显示
  @Prop({ type: Boolean, default: true })
  closable!: boolean;

  // 弹框title
  @Prop({ type: String })
  title!: string;

  // 宽度
  @Prop({ type: [Number, String], default: 520 })
  width!: [number, string];

  // 确定按钮的文案
  @Prop({ type: String })
  okText!: string;

  // 取消按钮的文案
  @Prop({ type: String })
  cancelText!: string;

  // 外部传来的样式
  @Prop({ type: Object })
  styles!: object;

  // 外部传来的样式类名
  @Prop({ type: String })
  className!: string;

  // 底部按钮是否显示
  @Prop({ type: Boolean, default: false })
  footerHide!: boolean;

  // 页面是否可以滚动
  @Prop({ type: Boolean, default: false })
  scrollable!: boolean;

  prefixCls: string = prefixCls;
  wrapShow: boolean = false;
  showHead: boolean = true;
  visible: any = this.value;
  timer: any = null;

  get maskClasses() {
    return `${prefixCls}-mask`;
  }

  get wrapClasses() {
    return [
      `${prefixCls}-wrap`,
      {
        [`${prefixCls}-hidden`]: !this.wrapShow,
        [`${this.className}`]: !!this.className,
      },
    ];
  }

  get classes() {
    return `${prefixCls}`;
  }

  get mainStyles() {
    let style = {};

    const width = parseInt(this.width);
    const styleWidth = {
      width: width <= 100 ? `${width}%` : `${width}px`,
    };

    const customStyle = this.styles ? this.styles : {};

    Object.assign(style, styleWidth, customStyle);

    return style;
  }

  get localeOkText() {
    if (this.okText === undefined) {
      return this.t("xb.popupWidow.okText");
    } else {
      return this.okText;
    }
  }

  get localeCancelText() {
    if (this.cancelText === undefined) {
      return this.t("xb.popupWidow.cancelText");
    } else {
      return this.cancelText;
    }
  }

  mounted() {
    if (this.visible) {
      this.wrapShow = true;
    }
    let showHead = true;

    if (this.$slots.header === undefined && !this.title) {
      showHead = false;
    }

    this.showHead = showHead;
  }

  close() {
    this.visible = false;
    this.$emit("input", false);
    this.$emit("on-cancel");
  }

  mask() {
    if (this.maskClosable) {
      this.close();
    }
  }

  cancel() {
    this.visible = false;
    this.$emit("on-cancel");
  }

  ok() {
    this.visible = false;
    this.$emit("on-ok");
  }

  @Watch("value")
  onValueChanged(val) {
    this.visible = val;
  }

  @Watch("visible")
  onvisibleChanged(val) {
    if (val === false) {
      this.timer = setTimeout(() => {
        this.wrapShow = false;
      }, 300);
      this.removeScrollEffect();
    } else {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.wrapShow = true;
      if (!this.scrollable) {
        this.addScrollEffect();
      }
    }
  }

  @Watch("scrollable")
  onScrollableChanged(val) {
    if (!val) {
      this.addScrollEffect();
    } else {
      this.removeScrollEffect();
    }
  }
}
</script>
