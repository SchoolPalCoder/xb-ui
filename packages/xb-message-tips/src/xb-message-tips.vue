<template>
  <transition name="slide-fade" v-on:after-leave="afterLeave">
    <div v-if="show" class="xbui-message-tips">
      <div class="xbui-message-tips-content">
        <!-- <xb-icon :class="type"></xb-icon> -->
        <span>{{type}}---{{text}}</span>
        <span class="xbui-message-tips_close" v-if="closable" @click="closeClick">x<i class="xbui-icon-uniE901"></i></span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";

@Component
export default class XbMessageTips extends Vue {
  show: Boolean = false;
  text: String = "";
  type: String = "";
  closable: Boolean = false;
  afterLeave() {
    return this.$emit("afterLeave");
  }
  closeClick() {
    return this.$emit("close");
  }
  methods() {
    this.afterLeave();
  }
}
</script>
