# TypeScript

- A `type` is a kind of data. JavaScript has many different types of data: strings, numbers, Booleans, arrays, objects, undefined and more.
- TypeScript does not run in the web browser. We only use the language in our code editor for **development**. TS exists for the _benefit of the developer_.
- A `compiler` is a piece of software that converts TypeScript to JavaScript so that it runs in our browser.
- [TypeScript Playground](https://www.typescriptlang.org/)

## TypeScript Basics

```ts
// Primitive Types
let firstName: string = "Leon";
let age: number = 30;
let isHandsome: boolean = true;
let whatTheFutureHolds: undefined = undefined;
let nothing: null = null;

// Type Inference
let firstName = "Leon"
let age = 30;
let isHandsome: boolean; // if we don't provide an initial value, we need to provide a type.
let whatTheFutureHolds: undefined = undefined;
let nothing: null = null;

// `any` type
// Not recommended as it is just normal JavaScript. It is a 'temporary' escape type.
let chameleon: any = 5;
chameleon = "hello"
chameleon = true
chameleon = [1,2]
chameleon = { a: true }

chameleon.push(5)

// `unknown` - less flexible than `any` (better)
// can assign any type to an `unknown` variable but
// TS raises an error when we try to invoke a method on the unknown variable
// Have to "proof" to TS it is of that type then we can invoke the related methods (TYPE GUARD)
let chameleon: unknown = "Leon";

// TYPE GUARD for `unknown` variable
if (typeof chameleon === "string") {
    console.log(chameleon.toUpperCase())
}
```