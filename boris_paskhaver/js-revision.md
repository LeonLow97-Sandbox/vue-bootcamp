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

const numbers = new Set()
numbers.add(5)
numbers.add(10)
numbers.add(15)

numbers.add(5)
numbers.add(10)

console.log(numbers) // Output: Set(3) { 5, 10, 15 }
```