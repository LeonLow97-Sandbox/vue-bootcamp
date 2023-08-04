# Pinia

<img src="./diagrams/pinia.png" alt="diagram of how pinia works" />

- Vue applications consist of state. **State** is the data that components rely on.
- Vue is reactive. When the state changes, Vue updates the view.
- Complexity creeps into an application when multiple components share a common state.
- **Pinia** is a state management library for Vue applications.
- Pinia is a library for managing global state (i.e., data that multiple components rely on).
- Pinia is a store library for Vue, it allows you to share a state across components/pages.
- Pinia was preceded by Vuex.

## Benefits of Pinia

- Separates the data manipulation from the view.
- Pinia exists independently of the components, so it can also be **unit tested by itself**. It doesn't have to know which components it is connected to or how many components it is connected to.
- Similar to Redux in React.

## Importing Pinia

- The `createPinia` function creates a global Pinia store. We configured the Pinia instance in our `main.js` file.

```js
// main.js
import { createPinia } from 'pinia';
createApp(App).use(pinia);
```

## Creating a simple Pinia store

- The `defineStore` function defines a "store", which can think of as a slice/fragment of the global Pinia store.
- The `state` method returns the initial state of the store.
- The `actions` method modify/mutate the store state.

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

## Referencing Pinia store in Vue components with `mapStores`

- The `mapStores` helper function connects a Pinia store to a component property accessible via the `this` keyword.
- Pinia will concatenate the prefix/ID we provided to defineStore with `Store`. For example, we chose `user` so we reference `userStore` in our `MainNav` component.

```js
// Pinia Store
export const useUserStore = defineStore('user', {...})

// Component
import { mapStores } from 'pinia';
import { useUserStore } from '@/stores/user';

computed: {
  ...mapStores(useUserStore), // "user" --> "userStore"
  headerHeightClass() {
    return {
      'h-16': !this.userStore.isLoggedIn,
      'h-32': this.userStore.isLoggedIn
    }
  }
}
```

- Reference methods in Pinia store action

```js
<ActionButton v-else text="Sign In" type="primary" @click="userStore.loginUser" />
```

## Referencing Pinia store in Vue components with `mapState` and `mapActions`

- Can use `mapState` and `mapActions` instead of `mapStores`.
- **Main Benefit**: Can selectively extract and use only the states and methods you need from the store, rather than importing the entire store object. This results in more efficient and focused component rendering, as only the necessary data and actions are available as computed properties and methods on `this`.
- The `mapState` function pulls in specific store state properties and makes them available on `this` as computed properties.
- The `mapActions` function pulls in specific store methods and makes them available on `this` as methods.

```js
<ProfileImage v-if="isLoggedIn" />
<ActionButton v-else text="Sign In" type="primary" @click="loginUser" />

import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

computed: {
  ...mapState(useUserStore, ['isLoggedIn']),
  headerHeightClass() {
    return {
      'h-16': !this.isLoggedIn,
      'h-32': this.isLoggedIn
    }
  }
},
methods: {
  ...mapActions(useUserStore, ['loginUser'])
}
```

## Pinia Actions (API Calls)

- Actions can perform asynchronous operations like making API requests. They then update Pinia state with their responses.

```js
export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: []
  }),
  actions: {
    async [FETCH_JOBS]() {
      const jobs = await getJobs()
      this.jobs = jobs
    }
  }
})
```

- Moving logic out of components into Pinia actions separates concerns. It also allows other components to have access to Pinia state + actions.

# Unit Testing Pinia

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

#### Unit Testing components that utilize Pinia store

- `const pinia = createTestingPinia({stubActions: false});`
  - Can use `createTestingPinia` in our **component tests** to have a global Pinia instance with writable state properties and actions replaced by mock functions.
  - If `stubActions` is false, the actual actions in the Pinia store will be executed when you call them in your test cases.
  - If `stubActions` is true (by default), the actions in the Pinia store will automatically be replaced with stubs (mock implementations) during testing.
- We can unit test Pinia stores in isolation. Access properties directly from the store and invoke actions as methods on the store.
- We added the Pinia testing library, which stubs out store actions when unit testing our components.

```js
// MainNav.test.js
import { createTestingPinia } from '@pinia/testing';
import MainNav from '@/components/Navigation/MainNav.vue';
import { useUserStore } from '@/stores/user';

const pinia = createTestingPinia();

render(MainNav, {
  global: {
    plugins: [pinia],
  },
  ...
});

describe('when the user logs in', () => {
  it('displays user profile picture', async () => {
    renderMainNav()
    const userStore = useUserStore()

    ...

    const loginButton = screen.getByRole('button', {
      name: /sign in/i
    })
    userStore.isLoggedIn = true // simulating state change in Pinia store
    await userEvent.click(loginButton)

    profileImage = screen.getByRole('img', {
      name: /user profile image/i
    })
    expect(profileImage).toBeInTheDocument()
  })
})
```
