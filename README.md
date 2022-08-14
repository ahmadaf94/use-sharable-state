# Sharable State Hook
[![npm (scoped)](https://img.shields.io/npm/v/use-sharable-state)](https://www.npmjs.com/package/use-sharable-state)
[![codecov](https://codecov.io/gh/Sam-Afshari/use-sharable-state/branch/main/graph/badge.svg?token=DD6PREZYF8)](https://codecov.io/gh/Sam-Afshari/use-sharable-state)
[![npm peer dependency version (scoped)](https://img.shields.io/npm/dependency-version/use-sharable-state/peer/react)](https://www.npmjs.com/package/react)
[![npm](https://img.shields.io/npm/dt/use-sharable-state)](https://img.shields.io/npm/dt/use-sharable-state)
[![GitHub](https://img.shields.io/github/license/sam-afshari/use-sharable-state)](https://github.com/sam-afshari/use-sharable-state/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/sam-afshari/use-sharable-state)](https://github.com/sam-afshari/use-sharable-state/issues)

The most performant and simple state sharing react hook that is only 1 KB!!

It can be used for both React and React Native applications.

---
## Installation
with NPM:
```sh
npm install --save use-sharable-state
```
with Yarn:
```sh
yarn add use-sharable-state
```
with PNPM:
```sh
pnpm add use-sharable-state
```

---

## Usage
You can use it like [useState](https://reactjs.org/docs/hooks-state.html) hook but with one extra key parameter for each different state:
```tsx
import { useCallback } from "react";
import { useSharableState } from "use-sharable-state";

const COUNTER_STATE_KEY = "counter";

const CounterComponent = () => {
  const [count, setCount] = useSharableState(COUNTER_STATE_KEY, 0);

  const increaseCounter = useCallback(() => {
    setCount((oldCount) => oldCount + 1) // or setCount(count + 1)
  }, [setCount])

  return (
    <div>
      <h1>Counter</h1>

      <p>{count}</p>

      <button
        type="button"
        onClick={increaseCounter}
      >
        Add
      </button>
    </div>
  );
};
```
for better usability and defining actions, you need to create a custom hook and isolate the actions that change the state:
```tsx
import { useSharableState } from "use-sharable-state";

const MESSAGE_COUNTER = "messageCounter";

const useMessageCounter = () => {
  const [count, setCount] = useSharableState(MESSAGE_COUNTER, 0);

  const increase = () => setCount((value) => value + 1);

  const decrease = () => setCount((value) => (value === 0 ? value : value - 1));

  return {
    count,

    increase,
    decrease,
  };
};

export default useMessageCounter;
```

---

# API Reference
### useSharableState

A react hook that adds a state to the component which it's value is shared between similar usages with the same `stateKey`

#### Props

| Prop          | Type   | Optional/Required |
|---------------|--------|-----------------|
| stateKey      | string | required        |
| initialState* | any    | optional        |

*: if the shared state has a value before, provided initialState will not be used.

#### Returns

```ts
import { useSharableState } from "use-sharable-state";

type State = {...}

const [state, setState]: [State, (nextState: State | ((prevState: State) => State)) => void] = useSharableState<State>(stateKey, initialState);
```

---

## License

[MIT](LICENSE)

