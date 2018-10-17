const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');

var component = {
  name: process.argv[2].toLowerCase(),
}

var transformName = (component) => {
  let arr = component.name.toLowerCase().split("-");
  let newArr = [];
  arr.forEach(item => {
    item = item.charAt(0).toUpperCase() + item.substring(1);//给字符串开头第一个变成大写'
    newArr.push(item);
  })
  let newComponentName = newArr.join("");
  return newComponentName;
}

var indexJS = (component) => {
  console.log(component);
  let newComponentName = transformName(component);
  return `
  const chai = require('chai');
  import ${newComponentName} from './../../../packages/${component.name}/src/${component.name}';
  import { mount } from '@vue/test-utils';
  const expect = chai.expect;

  describe('这是${newComponentName}组件，执行后希望完成的任务', () => {
    it('预期结果', () => {
      const wrapper = mount(${newComponentName});
    })
  })
  `;
}

fs.writeFile('../Xb-Basic-Components-master/test/unit/specs/' + component.name + '.spec.js', indexJS(component), err => {
  console.log('创建成功');
  if (err) {
    console.log(err);
  }
})
