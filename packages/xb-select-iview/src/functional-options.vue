
<script lang="ts">
const returnArrayFn = () => [];
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ name: "xbOption" })
export default class xbOption extends Vue {
  @Prop({ type: Function, default: () => {} })
  slotUpdateHook!: Function;

  @Prop({ type: Array, default: returnArrayFn })
  options!: any[];

  @Prop({ type: Array, default: returnArrayFn })
  slotOptions!: any[];

  functional: boolean = true;

  render(h, { props, parent }) {
    // to detect changes in the $slot children/options we do this hack
    // so we can trigger the parents computed properties and have everything reactive
    // although $slot.default is not
    if (props.slotOptions !== parent.$slots.default) props.slotUpdateHook();
    return props.options;
  }
}
</script>
