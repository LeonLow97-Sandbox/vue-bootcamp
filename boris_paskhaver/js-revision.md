# JavaScript Revision

## JavaScript Dynamic Object Keys

- Add _square brackets_ to the object key.

```js
const favouriteFood = "sushi"

const goodFoods = {
    [favouriteFood] = true,
}

console.log(goodFoods) // { sushi: true }
```

## `setTimeout`, `setInterval`, `clearInterval`

```js
// Arguments: function, number of milliseconds to wait before running the function.
// It will only run once
setTimeout(() => {
  console.log('I will print 2 seconds after the program starts ONCE');
}, 2000);

// It will run every time at a consistent interval (runs "forever")
// Unable to stop this execution
setInterval(() => {
  console.log('Runs every 2 seconds in setInterval...');
}, 2000);

const interval = setInterval(() => {
  console.log('Runs every 2 seconds...');
}, 2000);

setTimeout(() => {
  clearInterval(interval); // clears an interval, stops the execution of the interval
}, 10000);
```

## Making Axios Request

```js
// METHOD 1
const axios = require('axios');

const fetchJobsV1 = () => {
  axios.get('http://localhost:3000/jobs').then((response) => {
    console.log(response.data);
  });
};

fetchJobsV1();

// METHOD 2 (async-await syntax)
const fetchJobsV2 = async () => {
  const response = await axios.get('http://localhost:3000/jobs');
  console.log(response.data);
};

fetchJobsV2();
```

## Understanding JavaScript Sets

```js
/**
 * Arrays - order
 * Objects - association (key-value)
 * Sets - uniqueness (prohibit duplicate elements, unordered)
 */

const numbers = new Set();
numbers.add(5);
numbers.add(10);
numbers.add(15);

numbers.add(5);
numbers.add(10);

console.log(numbers); // Output: Set(3) { 5, 10, 15 }
```

## `filter` method in JavaScript

```js
// JavaScript `filter` method

const numbers = [1, 3, 5, 7, 2, 9, 11, 6];

console.log(numbers.filter((number) => number > 6)); // Output: [7, 9, 11]

const jobs = [
  { title: 'Angular Developer', organization: 'Microsoft' },
  { title: 'Programmer', organization: 'Google' },
  { title: 'Developer', organization: 'Microsoft' },
];

console.log(jobs.filter((job) => job.organization === 'Microsoft'));
```

## `ref` in Vue

```js
const { ref, computed } = require('vue');

let a = ref(1); // { value: 1 }
let b = ref(2); // { value: 2 }

// computed function runs whenever `a` or `b` changes
let c = computed(() => a.value + b.value); // now c is reactive

console.log(c.value); // 3

a.value = 10; // forces computed function to rerun because value of a has changed
console.log(c.value); // 12

b.value = 90;
console.log(c.value); // 100
```

```js
const name = ref('Leon');
const title = computed(() => name.value + ' the Great');

name.value = 'Darrel';
console.log(title.value); // 'Darrel the Great'
```

## Object reactivity with `reactive`

```js
/*
    {
        value: "Leon",
        reactiveMethods
    }
*/

const { ref, reactive, computed } = require('vue');

const person = reactive({
  name: 'Leon',
});

const title = computed(() => person.name + ' the Great');
console.log(title.value);

person.name = 'Darrel';
console.log(title.value);
```

## Chain reactivity with `reactive`

```js
const { reactive, computed } = require('vue');

const person = reactive({
  firstName: 'Leon',
  lastName: 'Low',
});

const title = computed(
  () => `${person.firstName} ${person.lastName}` + ' the Great'
);

// Tracks the length of the title (chain of reactivity)
const titleLength = computed(() => title.value.length);

console.log(title.value);
console.log(titleLength.value);

person.firstName = 'Darrel';
person.lastName = 'Ang';
console.log(title.value);
console.log(titleLength.value);
```

## `toRef` and `toRefs` for Object Destructuring

```js
const { reactive, computed, toRef, toRefs } = require('vue');

const person = reactive({
  firstName: 'Leon',
  lastName: 'Low',
});

const { firstName, lastName } = toRefs(person); // firstName = { value: "Leon" }

// const firstName = toRef(person, "firstName") // returns Vue reactive object
// const lastName = toRef(person, "lastName")

// const { firstName, lastName } = person // object destructuring

const title = computed(
  () => `${firstName.value} ${lastName.value}` + ' the Great'
);

console.log(title.value);

firstName.value = 'Darrel';
lastName.value = 'Ang';
console.log(title.value);
```
