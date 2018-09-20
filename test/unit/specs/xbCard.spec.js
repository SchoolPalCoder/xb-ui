const chai = require('chai')
import { mount } from '@vue/test-utils'
const expect = chai.expect
import xbCard from './../../../packages/xb-card/src/xb-card'




describe('这是xbCard组件，获取组件中h3的内容值为"xbCard.vue"', () => {
  it('h3 值为正常，预期结果为xbCard.vue.', () => {

    const wrapper = mount(xbCard);
    expect(wrapper.find('h3').text()).to.equal('xbCard.vue');
  })
})

