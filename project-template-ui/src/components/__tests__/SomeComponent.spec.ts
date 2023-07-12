import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SomeComponent from '../SomeComponent.vue'

describe('SomeComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(SomeComponent, { props: { message: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
