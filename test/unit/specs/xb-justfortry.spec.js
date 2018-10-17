
const chai = require('chai');
import XbJustfortry from './../../../packages/xb-justfortry/src/xb-justfortry';
import { mount } from '@vue/test-utils';
const expect = chai.expect;

describe('这是XbJustfortry组件，执行后点击影藏', () => {
  it('div隐藏', () => {
    const wrapper = mount(XbJustfortry);
    const btn = wrapper.find('.xb-justfortry-click');

    btn.trigger('click');
    const isShow = wrapper.vm.isShow;
    expect(isShow).to.be.false;
  })
})
