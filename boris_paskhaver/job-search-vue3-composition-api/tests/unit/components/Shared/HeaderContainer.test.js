import { render, screen } from '@testing-library/vue'

import HeaderContainer from '@/components/Shared/HeaderContainer.vue'

describe('HeaderContainer', () => {
  it('allows parent component to provide title content', () => {
    render(HeaderContainer, {
      slots: {
        title: '<h2>Some Title</h2>'
      }
    })
    expect(screen.getByText('Some Title')).toBeInTheDocument()
  })

  it('allows parent component to provide subtitle content', () => {
    render(HeaderContainer, {
      slots: {
        subtitle: '<h3>Some Subtitle</h3>'
      }
    })

    expect(screen.getByText('Some Subtitle')).toBeInTheDocument()
  })
})
