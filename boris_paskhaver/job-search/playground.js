// JavaScript `filter` method

const numbers = [1, 3, 5, 7, 2, 9, 11, 6]

console.log(numbers.filter((number) => number > 6)) // Output: [7, 9, 11]

const jobs = [
  { title: 'Angular Developer', organization: 'Microsoft' },
  { title: 'Programmer', organization: 'Google' },
  { title: 'Developer', organization: 'Microsoft' }
]

console.log(jobs.filter((job) => job.organization === 'Microsoft'))
