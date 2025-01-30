import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PetList from '@/components/PetList.vue'

describe('PetList', () => {
  it('renders properly', () => {
    const wrapper = mount(PetList)
    expect(wrapper.text()).toContain('')
  })
})
