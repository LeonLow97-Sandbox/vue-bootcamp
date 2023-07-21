const developer = {
  salary: 100000,
  experience: 4.5,
  techStack: ['Vue', 'HTML', 'CSS'],
  lookingForWork: true,
  doubleSalary() {
    this.salary = this.salary * 2
    this.lookingForWork = false
  }
}

console.log(developer.salary)
console.log(developer.lookingForWork)

developer.doubleSalary()

console.log(developer.salary)
console.log(developer.lookingForWork)