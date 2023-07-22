import { render, screen } from '@testing-library/vue'

import MainNav from '@/components/MainNav.vue'

describe('MainNav', () => {
  it('displays company name', () => {
    render(MainNav)
    const companyName = screen.getByText('Leon Careers')
    expect(companyName).toBeInTheDocument() // querying that the company name is in the DOM
  })

  it('displays menu items for navigation', () => {
    render(MainNav)
    const navigationMenuItems = screen.getAllByRole('listitem')
    const navigationMenuTexts = navigationMenuItems.map((item) => item.textContent)

    // not using `toBe` because toBe compares the exact reference in computer's memory
    expect(navigationMenuTexts).toEqual([
      'Teams',
      'Locations',
      'Life at Leon Careers',
      'How we Hire',
      'Students',
      'Jobs'
    ])
  })
})
