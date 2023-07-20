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
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
}

```

## Prettier Plugin for tailwind

- `npm install --save-dev prettier-plugin-tailwindcss`
  - to follow convention of writing tailwindcss

