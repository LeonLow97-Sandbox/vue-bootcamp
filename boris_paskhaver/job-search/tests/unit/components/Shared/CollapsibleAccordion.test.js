import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

describe('CollapsibleAccordion', () => {
  it('renders child content', async () => {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      },
      props: {
        header: 'My Category'
      },
      slots: {
        default: '<h3>My Nested Child</h3>'
      }
    })

    expect(screen.queryByText('My Nested Child')).not.toBeInTheDocument()
    const button = screen.getByRole('button', { name: /my category/i })
    await userEvent.click(button)
    expect(screen.getByText('My Nested Child')).toBeInTheDocument()
  })
})
