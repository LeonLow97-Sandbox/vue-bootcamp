import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

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

  describe('when the user logs in', () => {
    it('displays user profile picture', async () => {
      render(MainNav)

      let profileImage = screen.queryByRole('img', {
        // 'alt' attribute of img
        // Added '/i' regex to ignore case sensitivity
        name: /user profile image/i
      })
      expect(profileImage).not.toBeInTheDocument() // not logged in yet

      const loginButton = screen.getByRole('button', {
        name: /sign in/i
      })
      await userEvent.click(loginButton) // simulating login button click

      profileImage = screen.getByRole('img', {
        name: /user profile image/i
      })
      expect(profileImage).toBeInTheDocument()
    })
  })
})
