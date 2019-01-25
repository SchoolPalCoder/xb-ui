<template>
  <div :style="{'border-bottom':type==='card'?'1px solid #e5e5e5':''}">
    <div :class="prefixCls+'-nav'">
      <div
        v-if="type==='card'"
        :class="prefixCls+'-nav-border'"
        :style="{'width':borderWidth+'px','left':borderLeft+'px'}"
      ></div>
      <slot></slot>
    </div>
    <div style="clear:both"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ name: "XbTabs" })
export default class XbTabs extends Vue {
  @Prop({ default: "" })
  value!: string;

  // tab样式
  @Prop({ default: "line" })
  type!: string;

  prefixCls = "xbui-tabs";
  borderWidth: number = 0;
  borderLeft: number = 0;

  // 更新type===card的时候，下方border的位置
  updateNavBorder(width, left) {
    this.borderWidth = width;
    this.borderLeft = left;
  }

  // 点击切换tabs
  handleClick(label) {
    let prevIndex = this.$children.length;
    this.$children.forEach((re, index) => {
      if (re.isAcitve) {
        prevIndex = index;
        re.isAcitve = false;
      } else if (re.label === label) {
        re.isAcitve = true;
        this.borderWidth = re.$el.offsetWidth;
        this.borderLeft =
          prevIndex < index ? (re.closable ? re.$el.offsetLeft - 18 : re.$el.offsetLeft) : re.$el.offsetLeft;
      }
    });
  }

  // 移除某一个tabs
  removeClick(label) {
    if (this.$children.length > 1) {
      this.$children.forEach((re, index) => {
        if (re.label === label) {
          if (re.isAcitve == true) {
            // 被删除项是被选中的tab
            let num = index + 1 == this.$children.length ? 0 : index + 1;
            this.$children[num].isAcitve = true;
          }
          this.$children.splice(index, 1);
          this.$el.getElementsByClassName("xbui-tabs-nav-item")[index].remove();
        }
      });
    } else {
      alert("没有了，不能删了");
    }
  }

  // 显示tabs上面的close的icon
  isIconShow(label, state) {
    let prevIndex = this.$children.length;
    this.$children.forEach((re, index) => {
      if (re.isAcitve) {
        prevIndex = index;
      } else if (re.label === label) {
        if (prevIndex > index) {
          this.borderLeft = state ? this.borderLeft + 18 : this.borderLeft - 18;
        }
      }
    });
  }
}
</script>


