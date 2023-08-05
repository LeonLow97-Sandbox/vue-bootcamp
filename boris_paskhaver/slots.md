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

## Named Slots

- By giving each slot a `name`, we can have multiple slots within a single component (i.e., multiple places where the parent can provide custom HTML).
- If we do not give a `<slot>` a name, Vue will assign it the name `default`. Can only use one `<slot>` without a name.

```js
// Child Component (HeaderContainer.vue)
<template>
  <div class="mx-auto my-16 text-center">
    <slot name="title">Sample title</slot>
    <slot name="subtitle">Sample subtitle</slot>
  </div>
</template>
```

```js
// Parent Component (TeamsView.vue)
<template>
  <header-container>
    <template #title>
      <h1 class="w-full text-4xl font-normal">Teams</h1>
    </template>
    <template #subtitle>
      <h2 class="my-4 w-full text-base font-light">
        It's awesome working here. Why don't you come join us?
      </h2>
    </template>
  </header-container>
</template>
```

## Multiple Slots in the Parent (`TeamsView.vue`)

- Use the `v-slot` or `#`
- The parent component uses the `<template v-slot:slotName>` syntax to target a specific slot by name.
- Can also use the shortcut `<template #slotName>`. ESLint and the Vue Style Guide prefer this approach.

## Scoped Slots (`Spotlight.vue` & `TheHero.vue`)

- Scoped Slots **allow a child component with a `<slot>` to pass data up to the parent that renders it**.
- Pass slot props with regular `prop=value` syntax in line.
- In the parent, we can assign the slot props to an object or destructure them.

```js
// Child Component (SpotLight.vue)
<li v-for="spotlight in spotlights" :key="spotlight.id">
  <slot
    :img="spotlight.img"
    :title="spotlight.title"
    :description="spotlight.description"
  ></slot>
</li>
```

```js
// Parent Component (TheHero.vue)
<template v-slot:default="slotProps">
<template v-slot:default="whateverWeWant">
<template #default="slotProps">
<template #default="{ img, title, description }">
```

# Unit Testing Slots

## Testing Basic Slots

- The `render` function's configuration object accepts a `slots` property where we can provide sample HTML.
- Each slot has a _name_. Vue assigns a name of `default` if we use `<slot>` by itself. Thus, our `slots` property object uses a `default` property.

```js
// Child Component (CollapsibleAccordion.test.js)
it('renders child content', async () => {
  const props = {
    header: 'My Category',
  };
  const slots = {
    default: '<h3>My Nested Child</h3>',
  };
  const config = { props, slots };
  renderCollapsibleAccordion(config);

  expect(screen.queryByText('My Nested Child')).not.toBeInTheDocument();
  const button = screen.getByRole('button', { name: /my category/i });
  await userEvent.click(button);
  expect(screen.getByText('My Nested Child')).toBeInTheDocument();
});
```

```js
// Parent Component (HeaderContainer.test.js)
it('allows parent component to provide title content', () => {
  render(HeaderContainer, {
    slots: {
      title: '<h2>Some Title</h2>',
    },
  });
  expect(screen.getByText('Some Title')).toBeInTheDocument();
});
```

## Testing Scoped Slots

- Use the configuration object to the `render` function to setup the `slots` for the component under test.
- A slow without a name will have a name of default. Provide the <template> syntax and utilize the slot props however you want.

```js
// Child Component (SpotLight.test.js)
it('provides description to parent component', async () => {
  const spotlight = {description: "Another description"}
  mockSpotlightsResponse(spotlight)

  render(SpotLight, {
    slots: {
      default: `<template #default="slotProps">
              <h1>{{ slotProps.description }}</h1>
          </template>`
    }
  })

  const text = await screen.findByText('Another description')
  expect(text).toBeInTheDocument()
})
```
