import { t } from "../locale";
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Locale extends Vue {
  t(...args: any[]) {
    return t.apply(this, args as any);
  }
}
