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
- The Composition API offers a new way to build Vue components. It _complements_ the existing Options API.

## Defining Composition API

- We define all our logic in a `setup` method or `<script setup>` section in the component file. The latter is recommended by the Vue team.

---

#### `setup` method

```vue
<script>
import { computed, defineProps } from 'vue';

export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary'].includes(value);
      },
    },
  },
  setup(props) {
    const buttonClass = computed(() => {
      return {
        [props.type]: true,
      };
    });

    return {
      buttonClass,
    };
  },
};
</script>
```

---

#### `<script setup>` method

```vue
<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: 'primary', // if parent component does not provide
    validator(value) {
      return ['primary', 'secondary'].includes(value);
    },
  },
});

const { type } = toRefs(props); // object destructuring with reactivity by using `toRefs`

const buttonClass = computed(() => {
  return {
    [type.value]: true,
  };
});
</script>
```

---

## Replacing `computed` properties

- Use the `computed` function to re-run logic whenever a reactive piece of state changes. Pass a function as an argument.
- Vue will re-invoke the function whenever a piece of state referenced inside it updates. This is analogous to `computed` properties in the **Options API**.

## Receiving Props in the Setup method

- The `setup` method receives a reactive object of `props` as its first argument.

`setup(props) {}`

- Can utilize those props (for example, to compute CSS classes).
- The `props` object is reactive but its individual properties are not. Pass the `props` object to the `toRefs` function to return an object with all reactive properties.
- Can destructure properties from the object returned by `toRefs`. Remember that the properties are not individual reactive objects. Thus, must access `.value` when using them in JavaScript.
- When you use reactive objects in HTML, Vue knows to extract their underlying value. Thus, no need to add `.value`.

```js
// Without toRefs
[props.type]: true

// With toRefs
const { type } = toRefs(props)
[type.value]: true
```

- When using `<script setup>`, use the `defineProps` function to define props validation.
- The function will return the `props` object if you want to use it elsewhere in the section.
- We do not have to return an object with `<script setup>`. Our top-level names are available for use within the template.

## Composition API with Vue Router

- The Composition API replaces lots of functionality with helper functions or **composables**.
- To work with the Pinia store, we utilize the `use` functions.
- To work with Vue Router, we import `useRoute` and `useRouter`.

```js
// useRoute (`TheSubnav.vue`)
import { useRoute } from 'vue-router';

const route = useRoute();

const onJobResultsPage = computed(() => route.name === 'JobResults');

// useRouter (`JobFiltersSidebarCheckboxGroup.vue`)
import { useRouter } from 'vue-router';

const router = useRouter();

const selectValue = () => {
  props.action(selectedValues.value);
  router.push({ name: 'JobResults' });
};

// use in Pinia Store (`TheSubnav.vue`)
import { useJobsStore } from '@/stores/jobs';

const jobsStore = useJobsStore();
const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);
```

- A `composable` is a helper function that utilizes Vue's reactive features. The intent is that a component is composed of lots of smaller, reusable functions that provide reactive objects.

## Unit Testing with Vue3 useRoute, useRouter

- Our tests no longer mock out properties via `mocks` on the config object like the `$route` or `$router.`
- They mock out the helper functions that the component utilizes (`useStore`, `useRoute`, etc).

```js
// TheSubnav.test.js
import { useRoute } from 'vue-router';

vi.mock('vue-router');

describe('when user is on jobs page', () => {
  it('displays job count', async () => {
    useRoute.mockReturnValue({ name: 'JobResults' }); // mocking the return value of useRoute

    const { jobsStore } = renderTheSubnav();
    const numberOfJobs = 16;
    jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

    const jobCount = await screen.findByText(numberOfJobs);
    expect(jobCount).toBeInTheDocument();
  });
});
```