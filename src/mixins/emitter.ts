import { Vue, Component } from "vue-property-decorator";

function broadcast(this: Vue, componentName: string, eventName: string, params: string) {
  this.$children.forEach((child) => {
    const name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params) as any);
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]) as any);
    }
  });
}

@Component
export default class Emitter extends Vue {
  /** 根据组件名向上广播数据 */
  dispatch(componentName: string, eventName: string, params: any) {
    let parent = this.$parent || this.$root;
    let name = parent.$options.name;

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent;
      if (parent) {
        name = parent.$options.name;
      }
    }
    if (parent) {
      parent.$emit.apply(parent, [eventName].concat(params) as any);
    }
  }

  /** 根据组件名，向下广播数据 */
  broadcast(componentName: string, eventName: string, params: any) {
    broadcast.call(this, componentName, eventName, params);
  }
}
