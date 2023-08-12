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