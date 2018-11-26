import Vue from "vue";

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn(obj, key): boolean {
  return hasOwnProperty.call(obj, key);
}

// 根据组件名称，往下寻找所有子级组件
export function findComponentsDownward(context: Vue, componentName: string): Vue[] {
  return context.$children.reduce(
    (components, child) => {
      if (child.$options.name === componentName) {
        components.push(child);
      }
      const foundChilds = findComponentsDownward(child, componentName);
      return components.concat(foundChilds);
    },
    [] as Vue[]
  );
}

// 根据组件名称，往上寻找父级组件,返回最先找到的父组件Vue实例
export function findComponentUpward(context: Vue, componentName: string): Vue {
  let parent = context.$parent;
  let name = parent.$options.name;

  while (parent && (!name || parent.$options.name !== componentName)) {
    parent = parent.$parent;
    if (parent) {
      name = parent.$options.name;
    }
  }
  return parent;
}
