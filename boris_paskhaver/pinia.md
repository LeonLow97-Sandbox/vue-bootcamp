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

