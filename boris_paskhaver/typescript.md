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
// Example: create method to copy array, the array can have type string or type number
const copyArray = <T>(array: T[]): T[] => [...array];

copyArray<number>([1, 2, 3]);
copyArray<string>(['Leon', 'Low']);
copyArray<boolean>([true, false]);
```
