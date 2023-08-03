# Pinia

<img src="./diagrams/pinia.png" alt="diagram of how pinia works" />

- Vue applications consist of state. **State** is the data that components rely on.
- Vue is reactive. When the state changes, Vue updates the view.
- Complexity creeps into an application when multiple components share a common state.
- **Pinia** is a state management library for Vue applications.
- Pinia is a store library for Vue, it allows you to share a state across components/pages.
- Pinia was preceded by Vuex.

## Benefits of Pinia

- Separates the data manipulation from the view.
- Pinia exists independently of the components, so it can also be **unit tested by itself**. It doesn't have to know which components it is connected to or how many components it is connected to.
- Similar to Redux in React.

## Importing Pinia

```js
// main.js
import { createPinia } from 'pinia';
createApp(App).use(pinia);
```

## Creating a simple Pinia store

```js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
  },
});
```

---

#### Unit Testing Pinia store

```js
import { createPinia, setActivePinia } from 'pinia';

import { useUserStore } from '@/stores/user';
import { beforeEach } from 'vitest';

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('keeps track of if user is logged in', () => {
    const store = useUserStore();
    expect(store.isLoggedIn).toBe(false);
  });
});

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('loginUser', () => {
    it('logs the user in', () => {
      const store = useUserStore();
      store.loginUser();
      expect(store.isLoggedIn).toBe(true);
    });
  });
});
```

---

## Referencing Pinia store in Vue components

- import `mapStores` and pinia user store.
- Reference states in Pinia store with the `this` keyword

```js
import { mapStores } from 'pinia';
import { useUserStore } from '@/stores/user';

this.userStore.isLoggedIn;
```

- Reference methods in Pinia store action

```js
<ActionButton v-else text="Sign In" type="primary" @click="userStore.loginUser" />
```
