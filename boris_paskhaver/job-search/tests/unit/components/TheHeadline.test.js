import { nextTick } from 'vue'
import { render, screen } from '@testing-library/vue'

import TheHeadline from '@/components/TheHeadline.vue'
import { afterEach } from 'vitest'

describe('TheHeadline', () => {
  beforeEach(() => {
    vi.useFakeTimers() // use fake timers to control time-related operations
  })

  afterEach(() => {
    vi.useRealTimers() // clean up function for timers (reset to JavaScript timer)
  })

  it('displays introductory action verb', () => {
    render(TheHeadline)

    const actionPhrase = screen.getByRole('heading', {
      name: /build for everyone/i
    })
    expect(actionPhrase).toBeInTheDocument()
  })

  it('changes action verb at a consistent interval', () => {
    const mock = vi.fn() // creating a mock function
    vi.stubGlobal('setInterval', mock) // replacing global name with whatever we want

    render(TheHeadline)

    expect(mock).toHaveBeenCalled()

    vi.unstubAllGlobals() // removes setInterval mock and returns it back to the default JSDOM implementation
  })

  it('swaps action verb after interval', async () => {
    render(TheHeadline)
    vi.advanceTimersToNextTimer() // simulates 1 interval, move setInterval to the next interval

    await nextTick() // asynchronous function (moment when Vue updates DOM)

    const actionPhrase = screen.getByRole('heading', {
      name: /create for everyone/i
    })

    expect(actionPhrase).toBeInTheDocument()
  })

  it('removes interval when component disappears/unmounts', () => {
    const clearInterval = vi.fn()
    vi.stubGlobal('clearInterval', clearInterval)

    const { unmount } = render(TheHeadline)
    unmount() // simulate unmounting of component

    expect(clearInterval).toHaveBeenCalled()

    vi.unstubAllGlobals() // removes clearInterval mock and returns it back to the default JSDOM implementation
  })
})
