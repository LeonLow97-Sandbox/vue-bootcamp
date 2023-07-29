# JavaScript Revision

## JavaScript Dynamic Object Keys

- Add *square brackets* to the object key.

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
  console.log('I will print 2 seconds after the program starts ONCE')
}, 2000)

// It will run every time at a consistent interval (runs "forever")
// Unable to stop this execution
setInterval(() => {
  console.log('Runs every 2 seconds in setInterval...')
}, 2000)

const interval = setInterval(() => {
  console.log('Runs every 2 seconds...')
}, 2000)

setTimeout(() => {
    clearInterval(interval) // stops the execution of the interval
}, 10000)
```
