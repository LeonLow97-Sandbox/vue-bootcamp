# Slots

- `slots` allow a parent component to inject dynamic HTML content in a specified location in a child component.
- Use the `<slot>` component inside the child component. Can optionally provide default content within the opening `<slot>` and closing `<slot />` tags.
- This enables us to create more dynamic and flexible components by customizing their content without the need to modify the child component itself.
- Both props and slots allow us to build reusable and composable (composable = building complex functionality by combining smaller, reusable and independent components together) components in application.

## Slots vs Props

- Use slots when you want the parent to inject custom HTML.
- Use props when you would like to provide data to the child component

---
- Slots = HTML
- Props = JavaScript (numbers, strings, Booleans, arrays, objects, etc).
---

