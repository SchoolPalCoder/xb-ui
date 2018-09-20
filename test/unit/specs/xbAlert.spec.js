const chai = require('chai')
import xbAlert from './../../../packages/xb-alert/src/xb-alert'
import { mount } from '@vue/test-utils'
const expect = chai.expect



describe('这是xbAlert组件，点击后希望isShow的值为false', () => {
  it('isShow 执行正常，预期结果为false.', () => {
    const wrapper = mount(xbAlert);

    const increBtn = wrapper.find('.xb-alert-x');

    increBtn.trigger('click');
    const isShow = wrapper.vm.isShow;
    expect(isShow).to.be.false;
  })
})

