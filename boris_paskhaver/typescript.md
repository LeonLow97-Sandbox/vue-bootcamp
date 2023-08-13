# TypeScript

- A `type` is a kind of data. JavaScript has many different types of data: strings, numbers, Booleans, arrays, objects, undefined and more.
- TypeScript does not run in the web browser. We only use the language in our code editor for **development**. TS exists for the _benefit of the developer_.
- A `compiler` is a piece of software that converts TypeScript to JavaScript so that it runs in our browser.
- [TypeScript Playground](https://www.typescriptlang.org/)

## TypeScript Basics

```ts
// Primitive Types
let firstName: string = 'Leon';
let age: number = 30;
let isHandsome: boolean = true;
let whatTheFutureHolds: undefined = undefined;
let nothing: null = null;

// Type Inference
let firstName = 'Leon';
let age = 30;
let isHandsome: boolean; // if we don't provide an initial value, we need to provide a type.
let whatTheFutureHolds: undefined = undefined;
let nothing: null = null;

// `any` type
// Not recommended as it is just normal JavaScript. It is a 'temporary' escape type.
let chameleon: any = 5;
chameleon = 'hello';
chameleon = true;
chameleon = [1, 2];
chameleon = { a: true };

chameleon.push(5);

// `unknown` - less flexible than `any` (better)
// can assign any type to an `unknown` variable but
// TS raises an error when we try to invoke a method on the unknown variable
// Have to "proof" to TS it is of that type then we can invoke the related methods (TYPE GUARD)
let chameleon: unknown = 'Leon';

// TYPE GUARD for `unknown` variable
if (typeof chameleon === 'string') {
  console.log(chameleon.toUpperCase());
}
```

```ts
// Array Type Declarations
const foods: string[] = [];
foods.push('Apple');

const numbers: number[] = [4, 8, 15, 16, 23, 42];

// Object Type Declarations
const plumber: { name: string; skill: string; likesMushrooms: boolean } = {
  name: 'Mario',
  skill: 'Jumping',
  likesMushrooms: true,
};

// Type Literals - represents a single value
let isSmart = true; // boolean type with value true
const isHandsome = true; // `true` is both the value and type because it is a constant

isSmart = false;

// Type Literals and Objects
const plumber: { name: string; skill: string; likesMushrooms: true } = {
  name: 'Mario',
  skill: 'Jumping',
  likesMushrooms: true,
};

// plumber.likesMushrooms = false; // unable to do so because we assign likesMushrooms of type `true`

// Optional Properties - add a question mark '?'
let character: {
  name: string;
  skill: string;
  likesMushrooms?: boolean;
};

character = {
  name: 'Leon',
  skill: 'High Jump',
};

// Interfaces and Types (similar to each other)
// Allows for reusable types
interface VideoGameCharacter {
  name: string;
  skill: string;
  likesMushrooms?: boolean;
}

const characterOne: VideoGameCharacter = {
  name: 'Link',
  skill: 'Sword Fighting',
};

const characterTwo: VideoGameCharacter = {
  name: 'Mario',
  skill: 'Jumping',
  likesMushrooms: true,
};

// If using types, similar to interface above
type VideoGameCharacter = {
  name: string;
  skill: string;
  likesMushrooms?: boolean;
};
```

```ts
// Declaring Types for Functions
function multiply(a: number, b: number) {
  return a * b;
}

// Explicitly declare the function return value type
function multiply(a: number, b: number): number {
  return a * b;
}

const multiple = (a: number, b: number): number => {
  return a * b;
};

// Interfaces for Functions - to reduce duplications in type definitions
interface TwoNumberMathFunc {
  (a: number, b: number): number;
}

const multiply: TwoNumberMathFunc = (a, b) => a * b;
const sum: TwoNumberMathFunc = (a, b) => a + b;
```

```ts
// Generics
// Creation of reusable components (functions, classes, interfaces, etc.) that can work with different data types.
// Can substitute a data type later.
// Example: create method to copy array, the array can have type string or type number
const copyArray = <T>(array: T[]): T[] => [...array];

copyArray<number>([1, 2, 3]);
copyArray<string>(['Leon', 'Low']);
copyArray<boolean>([true, false]);
```

## TypeScript Summary Notes

- TypeScript is a JavaScript with types. Think of it like an enhanced version of JavaScript with type checking.
- We can declare the **types** of various JavaScript constructs like variables, constants, parameters, return values and more.
- TypeScript _infers_ the type of a value based on its original assignment or internal logic. However, its inference is not perfect; feel free to correct it whenever it is wrong.
- The `any` type can represent any type of value. It is an anti-pattern because it defeats the purpose of TypeScript. If you want to skip typing, consider using `unknown` instead, The `unknown` type will require a _type guard_ before you perform an operation.
- We can declare types for arrays and objects as well. The more details, the better the type checking.
  - `string[]` is a different type than `number[]`.
  - `{ name: string }` is a different type than `object`.
- Declare optional object properties with the `?` symbol at the end of the property name.
- An `interface/type` allows us to define a name for a reusable object type.
- A `generic` is a "generic type" whose exact type will be provided later when a function is invoked. Generics allow us to craft a reusable function instead of creating a duplicate one for each possible type variation.

# TypeScript with Vue

- TypeScript projects have a `tsconfig.json` file at the top. They also require us to setup additional values (ESLint, file references, etc).
- Can use `interfaces` to define complex object types such as Job and our Pinia store states. (`@/api/types.ts`)
- When we convert JavaScript files to TypeScript, we may encounter violations. TS will inform you when it is unsure of what type it's working with.

## Partial Functions

- The `Partial` type accepts a generic argument (type argument). It creates a new type where all the properties of the original type are optional.
  - `Partial<Job>`
- The `Partial` type can assist with factory functions in TypeScript.
- The `Job` type has many other properties. By using `Partial`, it makes all the properties in `Job` type optional but we cannot modify/add new properties.
- An empty object `{}` fulfils a `Partial` job type.

```ts
import type { Job } from '@/api/types';

const state1: Partial<Job> = {};

const state2: Partial<Job> = {
  organization: 'Microsoft',
};

const state3: Partial<Job> = {
  organization: 'Microsoft',
  jobType: 'Full-Time',
};

const invalidState: Partial<Job> = {
  a: 5,
};
```

## Adding TypeScript with Vue

- Add a `lang` attribute set to `"ts"` to the `<script>` tag.
- If using the **Options API**, import the `defineComponent` function from Vue and pass the component configuration object into it.
- If using the **Composition API**, can use either `setup` or return an object with named properties.

```ts
// Vue 2
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProfileImage',
  data() {
    return {
      imageLink:
        'https://www.pngitem.com/pimgs/m/487-4876417_link-head-png-toon-link-face-png-transparent.png'
    }
  }
})
</script>
```

```ts
// Vue 3
<script lang="ts" setup>
  import {ref} from 'vue' const imageLink = ref(
  'https://www.pngitem.com/pimgs/m/487-4876417_link-head-png-toon-link-face-png-transparent.png'
  )
</script>
```

## Adding TypeScript to Event Handlers in Vue 2

```ts
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TextInput',
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput($event: Event) {
      const target = $event.target as HTMLInputElement
      // passing value from Child component to Parent component
      // the payload in this event is `this.value`
      this.$emit('update:modelValue', target.value)
    }
  }
})
</script>

```

## Type Assertion

- The `as` keyword is used for **type assertion** in TypeScript.
- In the example below, TS does not know the type of `route.query.page` so we include `as string` to tell TypeScript to trust us that it will be of type `string`.

```ts
const currentPage = computed(() =>
  Number.parseInt((route.query.page as string) || '1')
);
```

## Axios Response

- `axios.get` accepts a generic type argument that represents the **object type of the API response**.

```ts
const response = await axios.get<Job[]>(url);
```

# Unit Testing

## TypeScript and Mocks (E.g., `axios.get`)

- Mocking out axios.
- TypeScript does not understand that `vi.mock` replaces an implementation with a Vitest mock function.
- Can use the `as` keyword to tell TS that an imported function/class/etc. is of type `Mock` from `vitest`.
  - `const axiosGetMock = axios.get as Mock`

```ts
import type { Mock } from 'vitest';
import axios from 'axios';

vi.mock('axios');
const axiosGetMock = axios.get as Mock;
```

## Unit Testing with composables

- Informing TypeScript that currentPage and maxPage are reactive properties with type `number`.

```ts
import { type Ref, computed } from 'vue'

const usePreviousAndNextPages = (currentPage: Ref<number>, maxPage: Ref<number>) => {...}
```

## Unit Testing with `Partial`

- Using `Partial` to make specifying other properties in the type `Job` optional.
- We could either create a helper function like `createJob` or mock the jobs with `as Job[]` as shown below.

```ts
const createJob = (job: Partial<Job> = {}): Job => ({
  id: 1,
  title: 'Angular Developer',
  organization: 'Vue and Me',
  degree: "Master's",
  jobType: 'Intern',
  locations: ['Lisbon'],
  minimumQualifications: ['Mesh granular deliverables'],
  preferredQualifications: ['Mesh wireless metrics'],
  description: ['Away someone forget effect wait land.'],
  dateAdded: '2021-07-04',
  ...job,
});

describe('UNIQUE_ORGANIZATIONS', () => {
  it('finds unique organizations from list of jobs', () => {
    const store = useJobsStore();
    store.jobs = [
      createJob({ organization: 'Google' }),
      createJob({ organization: 'Amazon' }),
      createJob({ organization: 'Google' }),
    ];

    // store.jobs = [
    //   { organization: 'Google' },
    //   { organization: 'Amazon' },
    //   { organization: 'Google' }
    // ] as Job[]

    const result = store.UNIQUE_ORGANIZATIONS;
    expect(result).toEqual(new Set(['Google', 'Amazon']));
  });
});
```

## Unit Testing with Pinia

- TypeScript informs us that we cannot change the value in Pinia store directly like this `jobsStore.FILTERED_JOBS` but for the purpose of testing, it should be done this way.
- Getters are not writable!
- Thus, add `// @ts-expect-error` to inform TS that this error is expected.

```ts
// @ts-expect-error: Getter is read only
jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});
```
