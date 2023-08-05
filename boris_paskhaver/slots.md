# Slots

- `slots` allow a parent component to inject dynamic HTML content in a specified location in a child component.
- Use the `<slot>` component inside the child component. Can optionally provide default content within the opening `<slot>` and closing `<slot />` tags. (`CollapsibleAccordion.vue`)
- This enables us to create more dynamic and flexible components by customizing their content without the need to modify the child component itself.
- Both props and slots allow us to build reusable and composable (composable = building complex functionality by combining smaller, reusable and independent components together) components in application.

## Slots vs Props

- Use slots when you want the parent to inject custom HTML.
- Use props when you would like to provide data to the child component

---

- Slots = HTML
- Props = JavaScript (numbers, strings, Booleans, arrays, objects, etc).

---

## Testing Slots

- The `render` function's configuration object accepts a `slots` property where we can provide sample HTML.
- Each slot has a _name_. Vue assigns a name of `default` if we use `<slot>` by itself. Thus, our `slots` property object uses a `default` property.

## Named Slots

- By giving each slot a `name`, we can have multiple slots within a single component (i.e., multiple places where the parent can provide custom HTML).
- If we do not give a `<slot>` a name, Vue will assign it the name `default`. Can only use one `<slot>` without a name.

```js
<template>
  <div>
    <h2>
      <slot name="title">Default Title</slot>
    </h2>
    <div>
      <slot name="content">Default Content</slot>
    </div>
  </div>
</template>
```

## Multiple Slots in the Parent (`TeamsView.vue`)

- Use the `v-slot` or `#`
- The parent component uses the `<template v-slot:slotName>` syntax to target a specific slot by name.
- Can also use the shortcut `<template #slotName>`. ESLint and the Vue Style Guide prefer this approach.