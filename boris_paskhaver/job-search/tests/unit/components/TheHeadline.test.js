import { render, screen } from '@testing-library/vue'

import TheHeadline from '@/components/TheHeadline.vue'

describe('TheHeadline', () => {
  it("displays introductory action verb", () => {
    vi.useFakeTimers() // use fake timers to control time-related operations
    render(TheHeadline);
    
    const actionPhrase = screen.getByRole("heading", {
        name: /build for everyone/i,
    })
    expect(actionPhrase).toBeInTheDocument();

    vi.useRealTimers() // clean up function for timers (reset to JavaScript timer)
  })

  it("changes action verb at a consistent interval", () => {
    vi.useFakeTimers()
    const mock = vi.fn() // creating a mock function
    vi.stubGlobal("setInterval", mock) // replacing global name with whatever we want

    render(TheHeadline)

    expect(mock).toHaveBeenCalled();

    vi.useRealTimers()
  })
})
