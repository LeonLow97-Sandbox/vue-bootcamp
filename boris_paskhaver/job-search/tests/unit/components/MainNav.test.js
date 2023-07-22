import { render, screen } from '@testing-library/vue'

import MainNav from '@/components/MainNav.vue'

describe('MainNav', () => {
  it('displays company name', () => {
    render(MainNav)
    const companyName = screen.getByText('Leon Careers')
    expect(companyName).toBeInTheDocument() // querying that the company name is in the DOM
  })
})
