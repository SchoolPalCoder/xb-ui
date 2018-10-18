<template>
  <div v-show="isShow" class="xb-alert" :class="type ? 'xb-alert-' + type : ''" :type="nativeType">
    <div>{{title}}</div>
    <span class="xb-alert-x" @click="close()">x</span>
  </div>
</template>


<script lang="ts">
import xbButton from "../../xb-button";
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component({
    components: { xbButton },
})
export default class XbAlert extends Vue {
    @Prop({ default: "default" })
    type!: string;

    @Prop({ default: "" })
    nativeType!: string;

    @Prop({ default: "" })
    title!: string;

    isShow: boolean = true;

    close() {
        this.isShow = false;
    }
}
</script>

