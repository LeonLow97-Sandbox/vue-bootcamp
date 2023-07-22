# Unit Testing

- **Testing** means writing code that validates that our implementation code works as expected.
- We write **assertions** to validate certain expectations of our code.
- Reduces manual testing.

## Unit Testing Tools

- Vitest
  - Test runner that uses Vite build tool; super-fast
  - Similar syntax to Jest
- Vue Testing Library
  - For testing the rendering of components.
  - Wraps Vue Test Utils and DOM Testing Library under the hood
  - Allows us to mount and interact with Vue components in a simulated browser environment.

## What is unit test?

- A **unit test** tests a single piece of a program in isolation.
- A **unit test** should be lightweight and should run fast.
- If there are dependencies, the unit test should **mock or stub** them out.

## Testing Pyramid

<img src="./diagrams/testing-pyramid.png" />

## Basics of Vitest Syntax

- `describe`: This function used to **group together related test cases**, providing a way to organize and categorize tests. It takes 2 arguments - the description of the test suite and a callback function containing the individual test cases (`it` blocks) within that suite.
- `it`: This function represents an **individual test case**. It takes 2 arguments - the description of the test and a callback function that contains the actual test logic, including assertions using `expect`.
- `expect`: This is an **assertion** library method used to define expectations in the test cases. It allows you to check whether a certain condition is met during the execution of the test. Commonly used methods with `expect` include `toBe`, `toEqual`, `toBeTruthy`, `toBeFalsy`, `toContain`, `toThrow`, etc.

## Test-Driven Development (TDD)

1. Write Tests first.
2. Write the implementation code that makes the test pass.
3. Improve code without changing its underlying purpose as you can run the tests to check that the code still works.

---

#### Benefits

1. Ensure you are testing the right thing.
2. Avoid duplication of tests.
3. Describe the "why" rather than the implementation.
4. Higher test coverage.
5. Makes code easy to refactor. If you make changes to your code, you can run the tests to check if the code is still behaving as it should.
6. Leads to higher-quality tests and implementation code.

---

## Vue Testing Library

```js
import { render, screen } from '@testing-library/vue';

import MainNav from '@/components/MainNav.vue';

describe('MainNav', () => {
  it('displays company name', () => {
    render(MainNav);
    screen.debug();
  });
});
```

- `render` function is used to **render a Vue component for testing purposes** to a virtual DOM, allowing you to interact with and inspect the component's rendered output and behavior.
- `screen` is an object that contains various utility methods for querying and interacting with the rendered component's elements, such as `screen.debug()` which prints the component's current DOM structure to the console for debugging purposes.

## Vue Testing Components

```js
render(MainNav);
const companyName = screen.getByText('Leon Careers');
expect(companyName).toBeInTheDocument(); // querying that the company name is in the DOM
```

- Rendering the expected company name and ensuring it is displayed in the virtual HTML DOM.

```js
render(MainNav, {
  data() {
    return {
      company: 'Super Corp',
    };
  },
});
```

- NOT RECOMMENDED
- Optional to customize certain aspects of the component (e.g.,companyName value) in the second argument of the `render` function.

## `screen`

- `screen` object to query/search the DOM for elements in various ways (by role, by text, by label, etc).

|   Methods   | Description                                          |
| :---------: | ---------------------------------------------------- |
|   `getBy`   | Searches for 1 HTML element with the given criteria. |
| `getByText` | Search by text.                                      |
