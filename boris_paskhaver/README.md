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

## Different ways to render a component

- They are render the component in the same way.

```js
  <MainNav />
  <MainNav></MainNav>
  <main-nav />
  <main-nav></main-nav>
```

## `name` property

- Defines the component's name.

```html
<script>
  export default {
    name: 'MainNav',
  };
</script>
```

## Rendering Data to View

- `data()` function is used to define the data properties for a component.
- In this example, it defines a single data property called `company` with the value `'Leon Careers'`, which can be accessed and rendered in the component's template or methods.

```js
<template>
  <a href="/">{{ company }}</a>
</template>

data() {
  return {
    company: 'Leon Careers'
  }
}
```

## ARIA Roles

- **Accessibility** means designing websites/apps to be capable of being used by as many people as possible.
- Users of our application may not be able to use a mouse or a keyboard. Users may be using a screen reader or another assistive technology to parse the website.
- Examples of Accessibility:
  - The `alt` tag provides context to users who may have visual impairments. It also helps all users if the image fails to load for some reason (server's down, slow connection, etc).
  - A **responsive design** ensures users on different devices (desktop computers, phones, tablets) can use our website.

---

#### WAI-ARIA Roles

- By default, many semantic elements in HTML have a role. For example, `<input type="radio">` has the "radio" role.
- Non-semantic elements in HTML do not have a role; `<div>` and `<span>` without added semantics return `null`. The `role` attribute can provide semantics.
- ARIA roles are added to HTML elements using `role="role type"`, where _role type_ is the name of a role in the ARIA specification.
- Some roles require the inclusion of associated ARIA states or properties, others are valid in association with other roles.

---

## Component Methods

- Can attach **methods** to our component.
- The methods can access "data" properties via the `this` keyword.
- Vue re-renders a component template whenever a piece of `data` changes.

## Passing Props

- Passing data from parent component to child components.
- To pass in a **boolean**/array/object/... value as prop, use the v-bind syntax `:is-primary="false"`. If it is a string, then don't need to use `v-bind`.

```js
// ParentComponent
<div>
  <ActionButton text="Sign In" @click="loginUser" />
</div>

// Child Component
<template>
  <button>
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ActionButton',
  props: ['text']
}
</script>
```

## `computed` property

- Used to define properties in a component that are calculated based on other data properties.
- Create reactive properties that automatically update whenever their dependent properties change.
- In this example, we are using a reusable button component where you can customize the looks of the button by passing in props into the Button component.

```js
// ParentComponent
<ActionButton text="Sign In" type="primary" @click="loginUser" />

// ChildComponent
<template>
  <button :class="buttonClass">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ActionButton',
  props: ['text', 'type'],
  computed: {
    buttonClass() {
      return { primary: this.type === 'primary', secondary: this.type === 'secondary' }
    }
  }
}
</script>
```