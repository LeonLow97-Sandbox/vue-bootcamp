# Vue Reactivity

- Vue 3 Composition API introduces functions that enable **reactivity** outside of Vue components.

## Vue `ref` function (js-revision.md)

- `ref` function wraps its argument in reactive object.
- The original value can be accessed via the `value` property.
- Can overwrite the value by overwriting the object's `value` property.
- Use `ref` for primitive values
- Use `reactive` for objects, non-primitive.

## `computed` function (js-revision.md)

- `computed` function calculates a derived value based on the reactive object's value that is going to change.
- `computed` function accepts a function as an argument. Vue will re-invoke the function whenever its referenced values change.
- Can pass an object to to the `ref` function. However it is cleaner to pass the object to the `reactive` function because it removes the need for a `value` property.

## `toRef` and `toRefs` (for object destructuring with reactivity)

- `toRef` function creates a reactive object around a single reactive object property.
- `toRefs` function accepts a reactive object. It makes every object property reactive. This approach allows us to destructure properties. However, the properties will now be reactive objects with `value` properties.

# Composition API

- Syntax used so far is `Options API` which is the standard way to build components in Vue 2. It is still present in Vue 3 and is not going anywhere anytime soon.
- Vue 3 introduced the `Composition API` as an alternate way to create Vue components. It solves some of the problems that the Options API has.
    - Issue 1: Code that logically belongs together (i.e., the same feature) is split across multiple parts of the component configuration object (data, methods, and computed.)
    - Issue 2: Difficult to reuse logic across components. Vue offered mixins in Version 2 but they are considered an anti-pattern.
- The Composition API bundles together all component logic in a single setup method that is part of the Vue configuration object.
- The HTML template syntax (like Vue directives `v-on`, `v-if`, ...) and Vue object properties (props, components, etc.) doesn't change.