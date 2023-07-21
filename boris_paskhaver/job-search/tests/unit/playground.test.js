// import { describe, it, expect } from 'vitest'
import { evenOrOdd, multiply } from '@/playground'

describe('basic math', () => {
  it('adds 2 numbers', () => {
    expect(1 + 1).toBe(2)
  })

  describe('evenOrOdd', () => {
    it('number is even', () => {
      expect(evenOrOdd(4)).toBe('Even')
    })

    it('number is odd', () => {
      expect(evenOrOdd(3)).toBe('Odd')
    })
  })

  describe('multiply', () => {
    it('multiplies 2 numbers together', () => {
      expect(multiply(2, 3)).toBe(6)
    })
  })
})
