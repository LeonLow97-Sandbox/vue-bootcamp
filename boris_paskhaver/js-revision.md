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