# VueJS

- JavaScript framework for building reactive (able to react to change) user interfaces.
- Vue ecosystem including Vue Router and Pinia.
- Unit Testing with Vue Testing Library and vitest.
- Coverage of front end tools like Vite, TailswindCSS and TypeScript.
- Project similar to `careers.google.com`
- `Create Vue` is a tool for creating a Vue project from scratch. It runs on the Vite build tool.
- `Hot Reloading` is a feature that re-renders our Vue application when code changes in our editor.

## Mounting the Vue App

- The `index.html` file is the barebone and consists of a single `<div>`
- We create the Vue app by mounting a root component inside the `<div>`. Vue takes care of all future DOM updates.

```js
<div id="app"></div>
```

## The `scoped` Attribute

- The `scoped` attribute restricts the styles defined inside it to only affect elements within that specific component's `<template>`, providing encapsulated styles.

```html
<style scoped>
h1 {
  color: red;
}
</style>
```