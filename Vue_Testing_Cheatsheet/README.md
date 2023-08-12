# Vue Testing Library

---

### `render`

    - `render` function to render Vue component.
    - It returns an object containing various methdos that you can use to interact with and query the rendered component.

```js
import { render } from '@testing-library/vue';

render(YourComponent, {
  // Optional: Provide props, slots, and other options here
  props: {
    message: 'Hello World!',
  },
});

// Another way
const { getByText, getByRole } = render(YourComponent);

const someElement = getByText('Some Text');
const buttonElement = getByRole('button', { name: 'Click Me' });
```

---

### `screen`

    - `screen` object is used to query and interact with elements in the DOM.

```js
import { screen } from '@testing-library/vue';

render(HeaderContainer, {
  slots: {
    title: '<h2>Some Title</h2>',
  },
});
expect(screen.getByText('Some Title')).toBeInTheDocument();
```

## Search Variants in `screen` or `render`

|                 | Return if no match | Return if 1 match | Return if >1 match | Await? |
| --------------- | ------------------ | ----------------- | ------------------ | ------ |
| `getBy...`      | throw              | return            | throw              | No     |
| `findBy...`     | throw              | return            | throw              | Yes    |
| `queryBy...`    | `null`             | return            | throw              | No     |
| `getAllBy...`   | throw              | array             | array              | No     |
| `findAllBy...`  | throw              | array             | array              | Yes    |
| `queryAllBy...` | []                 | array             | array              | No     |

## Search Types in `screen` or `render`

|                        | finds by...                      | DOM Example                           |
| ---------------------- | -------------------------------- | ------------------------------------- |
| `...ByLabelText`       | label or aria-label content      | `<label for ="element" />             |
| `...ByPlaceholderText` | input placeholder value          | `<input placeholder="name" />`        |
| `...ByText`            | element text content             | `<p>Lorem ipsum</p>`                  |
| `...ByDisplayValue`    | form element current value       | Current value of input element        |
| `...ByAltText`         | img alt attribute                | `<img alt="movie poster" />`          |
| `...ByTitle`           | title attribute or svg title tag | `<span title="Add" />` or `<title />` |
| `...ByRole`            | ARIA role                        | `<div role="dialog" />`               |
| `...ByTestId`          | data-testid attribute            | `<div data-testid="some-message" />`  |

### `expect`

- [Vitest expect](https://vitest.dev/api/expect.html)
- `expect` is used to create assertions.

---

#### `not`

- `not` will negate the assertion.
- For example, the following code asserts that an `input` value is not equal to 2. If equal, the assertion will throw an error, and the test fails.

```js
const input = Math.sqrt(16);

expect(input).not.toBe(2);
```

---

#### `toBe`

- Assert if primitives (numbers, strings, booleans) are equal.

```js
const stock = {
  type: 'apples',
  count: 13,
};

test('stock has 13 apples', () => {
  expect(stock.type).toBe('apples');
  expect(stock.count).toBe(13);
});
```

---

#### `toEqual`

- Assert that 2 objects (arrays, objects, nested objects) are equal by comparing their properties and values.

```js
// Array comparison
const expectedArray = [1, 2, 3];
const actualArray = [1, 2, 3];
expect(actualArray).toEqual(expectedArray);

// Object comparison
const expectedObject = { foo: 'bar', baz: 'qux' };
const actualObject = { foo: 'bar', baz: 'qux' };
expect(actualObject).toEqual(expectedObject);
```

- Did not use `toBe()` because it checks if 2 variables refer to the exact same object in memory. `toEqual()` checks if the properties and values of 2 objects are the same, even if they are different objects in memory.

---

#### `toHaveBeenCalled`

- Assert that a function has been called.

```js
it('fetches jobs that candidates can apply to', async () => {
  await getJobs();
  expect(axios.get).toHaveBeenCalled();
});
```

---

#### `toHaveBeenCalledWith`

- Assert that a function was called at least once with certain parameters.

```js
it('fetches jobs that candidates can apply to', async () => {
  await getJobs();
  expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/jobs');
});
```

#### `toHaveBeenCalledTimes`

- Assert that a function was called a certain amount of times.

```js
it('fetches jobs that candidates can apply to', async () => {
  await getJobs();
  expect(axios.get).toHaveBeenCalledTimes(1);
});
```
