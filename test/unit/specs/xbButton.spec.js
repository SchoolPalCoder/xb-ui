const chai = require('chai')
import xbButton from './../../../packages/xb-button/src/xb-button'
import { mount } from '@vue/test-utils'
const expect = chai.expect



describe('这是xbButton组件，点击后希望num的值为1', () => {
  it('num 执行正常，预期结果为1.', () => {
    const wrapper = mount(xbButton);

    const increBtn = wrapper.find('.xb-button');

    increBtn.trigger('click');
    const num = wrapper.vm.num;
    expect(num).to.equal(1);
  })
})

