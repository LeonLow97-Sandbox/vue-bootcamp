## Use Create Vue to Initialize Vue Project

- `npm init vue@3`
- `cd` into project folder
- `npm run dev`

## Adding Vue DevTools

- Go to `www.google.com`
- Type `Vue.js devtools` and add the chrome extension.
- Open Chrome Devtools and look for 'Vue'. This shows the component hierarchy and provides debugging support.

## Installing tailwindcss

- `npm install --save-dev tailwindcss postcss autoprefixer`
- `npx tailwindcss init -p`
  - creates `tailwind.config.js` and `postcss.config.js`

## Configuring tailwindcss fonts

- Ensure that there is a fallback font after the imported 'Open Sans' font.

```js
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
```

## Prettier Plugin for tailwind

- `npm install --save-dev prettier-plugin-tailwindcss`
  - to follow convention of writing tailwindcss

## Vitest

- Ensure `package.json` has this:
  - `"test:unit": "vitest --environment jsdom",`
- Test file must end with
  - `.test.js` or `.spec.js`
- To run the test
  - `npm run test:unit`

## Vitest Unit Test Coverage

- In `package.json`:
  - `"test:unit": "vitest --environment jsdom --coverage",`
- Run `npm run test:unit` and terminal will prompt to install `@vitest/coverage-v8`. Hit 'Y'.