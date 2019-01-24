<template>
<div>
  <div>
  <!-- <xb-icon type="arrow-left" size="14px"></xb-icon> -->
  <div :class="prefixCls+'-nav'">
    <div :class="[prefixCls+'-nav-item',prefixCls+'-nav-'+type,item.isCheck?prefixCls+'-nav-'+type+'-active':'']"  @click="handleChange(index)" v-for="(item, index) in navList">
      <xb-icon :type="item.icon"></xb-icon>
      <span>{{ item.name }}</span>
    </div>

  </div>
  <!-- <xb-icon type="arrow-right" size="14px"></xb-icon> -->
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({ name: "XbTabs" })
export default class XbTabs extends Vue {
  // tab样式
  @Prop({ default: "" })
  value!: string;

  @Prop({ default: "line" })
  type!: string;

  prefixCls = "xbui-tabs";
  navList: any = [];
  // navList: any = [
  // {
  //   isCheck: true,
  //   icon: "edit",
  //   name: "标题1",
  // },
  // {
  //   icon: "achievement",
  //   name: "标题2",
  // },
  // {
  //   icon: "activity",
  //   name: "标题3",
  // },
  // ];
  // handleChange(index) {
  //   this.navList.map((re) => {
  //     delete re.isCheck;
  //   });
  //   this.navList[index].isCheck = true;
  // }

  mounted() {
    // this.navList = [];
    // console.log(this.value);
    // let tabsPanes = this.$children.filter((item) => item.$options.name === "xb-tabs-pane");
    // // let tabsPanes = this.$children.filter((item) => console.log(item));
    // console.log(tabsPanes);
  }
}
</script>



