import { render, screen } from '@testing-library/vue'
import ActionButton from '@/components/Shared/ActionButton.vue'

describe('ActionButton', () => {
  it('renders text', () => {
    render(ActionButton, {
      props: {
        text: 'Click Me',
        type: 'primary'
      }
    })

    const button = screen.getByRole('button', {
      name: /Click Me/i // test that the button with text "Click Me" exists
    })
    expect(button).toBeInTheDocument()
  })

  it('applies one of several styles to button', () => {
    render(ActionButton, {
      props: {
        text: 'Click Me',
        type: 'primary'
      }
    })

    const button = screen.getByRole('button', {
      name: /Click Me/i
    })
    expect(button).toHaveClass('primary') // testing CSS class name
  })
})
