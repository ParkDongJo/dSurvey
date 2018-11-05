import Vue from 'vue'
import Dashboard from '@/components/BasicView'
import router from '@/router'

describe('BasicView.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Dashboard)
    const vm = new Constructor({router}).$mount()
    expect(vm.$el.querySelector('.basicView h1').textContent)
      .to.equal('Welcome to your truffle-vue dApp')
  })
})
