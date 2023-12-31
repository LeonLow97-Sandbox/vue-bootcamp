## Use Create Vue to Initialize Vue Project

- `npm init vue@3`
- `cd` into project folder
- `npm install`
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

## Vue Testing Library

- `npm install --save-dev @testing-library/vue @testing-library/jest-dom @testing-library/user-event`
- Create a `setup.js` in the root directory of your project
  - Add this `setup.js` file into a `tests` folder.

```js
import { cleanup } from '@testing-library/vue';
import matchers from '@testing-library/jest-dom/matchers';
import { expect, afterEach } from 'vitest';

expect.extend(matchers);

afterEach(() => {
  // ensure each test starts with a clean state
  cleanup();
});
```

- Include it in `vite.config.js`

```js
test: {
  globals: true,
  setupFiles: ["./tests/setup.js"]
}
```

## Vitest Unit Test Coverage

- In `package.json`:
  - `"test:unit": "vitest --environment jsdom --coverage",`
- Run `npm run test:unit` and terminal will prompt to install `@vitest/coverage-v8`. Hit 'Y'.

## Making Vitest `describe`, `it`, `expect` global

- Go to `vite.config.js`

```js
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // add this
  test: {
    globals: true,
  },
});
```

- Run `npm install --save-dev eslint-plugin-vitest-globals`
- In `.eslintrc.cjs`, add

```js
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:vitest-globals/recommended', // add this
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  env: {
    'vitest-globals/env': true, // add this
  },
};
```

## Testing Playground Chrome Extension

- Go to Google and search for `Testing playground chrome extension` and add this extension.
- Open DevTools and it will be there.

## fontawesome icons

- `npm install --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/vue-fontawesome@latest-3`
- Include fontawesome as a global variable in `main.js`

```js
import { createApp } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import '@/index.css';
import App from '@/App.vue';

// add fontawesome icons for our project
library.add(faSearch);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
```

- Including the icon in component

```js
<div>
  <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
</div>
```

## Installing Vue Router

- `npm install --save vue-router@4`

## JSON Server for Backend

- `npm install --save-dev json-server`
- Add to `package.json` with the following file `db.json` in root directory of project
  - `"backend": "json-server --watch db.json",`
  - `npm run backend` (will run on port 3000)
  - Go to `localhost:3000/jobs` to see the JSON. Add JSONView Chrome Extension.

## Installing Axios

- `npm install --save axios`

## Installing Pinia

- `npm install --save pinia`

## Installing Pinia Testing Library

- `npm install --save-dev @pinia/testing`

## TypeScript

- `npm install --save-dev typescript @vue/tsconfig @vue/eslint-config-typescript @types/jsdom @types/node`
- Add to `.eslintrc.cjs`
  ```js
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    "@vue/eslint-config-typescript",
    '@vue/eslint-config-prettier/skip-formatting',
    "plugin:vitest-globals/recommended"
  ],
  ```
- Rename `vite.config.js` to `vite.config.ts`
- Add to top of the file os `vite.config.ts`
  - `/// <reference types="vitest" />`