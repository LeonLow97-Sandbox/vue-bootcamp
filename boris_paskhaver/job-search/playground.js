/**
 * Arrays - order
 * Objects - association (key-value)
 * Sets - uniqueness (prohibit duplicate elements, unordered)
 */

const numbers = new Set()
numbers.add(5)
numbers.add(10)
numbers.add(15)

numbers.add(5)
numbers.add(10)

console.log(numbers) // Output: Set(3) { 5, 10, 15 }