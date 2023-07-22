# Directives

## `v-bind` Directive

- Binding a HTML attribute to a piece of data in the component.
- Use `:attr` as a shortcut to `v-bind:attr`.

```js
<a v-bind:href="url">Leon Careers</a>;

export default {
  name: 'MainNav',
  data() {
    return {
      url: 'https://careers.google.com',
    };
  },
};
```

```js
// Another way to avoid eslint violation, just add a colon (recommended)
<a :href="url">Leon Careers</a>;
```

## `v-for` Directive

- Need to bind a unique value to the `key` attribute in a `v-for` to enable Vue to differentiate between the elements.
- Can configure Tailwind utility classes that apply a style to only the _first child_ element in a group.

```js
<li v-for="menuItem in menuItems" :key="menuItem" class="ml-9 h-full">
    <a href="">{{ menuItem }}</a>
</li>

menuItems: ['Teams', 'Locations', 'Life at Leon Careers', 'How we Hire', 'Students', 'Jobs']
```

---

#### Using tailwind's first child utility class

- Applies margin-left 0 to the first element in the `v-for` loop

```js
class="first:ml-0 ml-9 h-full"
```

---

## `v-if` Directive

- Conditionally render a part of the template.

```js
<ActionButton v-if="false" />
```

## `v-else` Directive

- Renders a chunk of HTML if the `v-if` directive evaluates to false.

```js
<ProfileImage v-if="isLoggedIn" />
<ActionButton v-else />
```

## `v-on` Directive

- `v-on` directive declares a method for Vue to invoke whenever an event occurs. For example, `v-on:click` will react to a user click.
- `@` is a shortcut for `v-on`. For example, we can write `@click` instead of `v-on:click`.
- Don't invoke the `v-on` method, Vue will run it automatically.
- Vue passes an event object to a `v-on` method whenever it invokes it. The event object includes information/metadata about the event.

```js
v-on:click="handleClick"
@click="handleClick" // this syntax works too

<script>
export default {
  name: 'ActionButton',
  methods: {
    handleClick() {
      console.log('I have been clicked!')
    }
  }
}
</script>
```
