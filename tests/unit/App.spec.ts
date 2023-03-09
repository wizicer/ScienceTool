import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('has header', () => {
    const wrapper = mount(App)
    expect(wrapper.html()).toMatch(
      '<router-link to="/">科研工具</router-link>'
    )
  })
})
