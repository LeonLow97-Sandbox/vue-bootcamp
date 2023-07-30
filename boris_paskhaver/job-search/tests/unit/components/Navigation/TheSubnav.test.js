import { render, screen } from '@testing-library/vue'

import TheSubnav from '@/components/Navigation/TheSubnav.vue'

describe('TheSubnav', () => {
  describe('when user is on jobs page', () => {
    it('displays job count', () => {
      // Mocking this.$route.name
      const $route = {
        name: 'JobResults'
      }

      render(TheSubnav, {
        global: {
          // mock anything with `this` keyword
          mocks: {
            $route
          },
          stubs: {
            FontAwesomeIcon: true
          }
        }
      })

      const jobCount = screen.getByText('1653')
      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('when user is not on jobs page', () => {
    const $route = {
      name: 'Home'
    }

    it('does NOT display job count', () => {
      render(TheSubnav, {
        global: {
          mocks: {
            $route
          },
          stubs: {
            FontAwesomeIcon: true
          }
        }
      })

      const jobCount = screen.queryByText('1653')
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
