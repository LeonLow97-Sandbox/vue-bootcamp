const { reactive, computed, toRef, toRefs } = require('vue')

const person = reactive({
  firstName: 'Leon',
  lastName: 'Low'
})

const { firstName, lastName } = toRefs(person) // firstName = { value: "Leon" }

// const firstName = toRef(person, "firstName") // returns Vue reactive object
// const lastName = toRef(person, "lastName")

// const { firstName, lastName } = person // object destructuring

const title = computed(() => `${firstName.value} ${lastName.value}` + ' the Great')

console.log(title.value)

firstName.value = 'Darrel'
lastName.value = 'Ang'
console.log(title.value)
