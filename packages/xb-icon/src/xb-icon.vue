<template>
  <i :class="'xbui-icon-' + name">
  </i>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
@Component({})
export default class XbIcon extends Vue {
    @Prop({ required: true })
    name!: string;
}
</script>
