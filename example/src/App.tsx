import { useSharableState } from "use-sharable-state";

import useMessageCounter from "./hooks/useMessageCounter";

const FirstCounter = () => {
  const [count, setCount] = useSharableState("Counter", 0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Counter #1</h1>

      <p>{count}</p>

      <button
        type="button"
        onClick={() => setCount((oldCount: number) => oldCount + 1)}
      >
        Add
      </button>
    </div>
  );
};

const SecondCounter = () => {
  const [count, setCount] = useSharableState("Counter", 0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Counter #2</h1>

      <p>{count}</p>

      <button
        type="button"
        onClick={() => setCount((oldCount: number) => oldCount + 1)}
      >
        Add
      </button>
    </div>
  );
};

const FirstMessageCounter = () => {
  const { count, increase, decrease } = useMessageCounter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Message Counter #1</h1>

      <p>Total Messages: {count}</p>

      <button type="button" onClick={increase}>
        Add Message
      </button>

      <button type="button" onClick={decrease}>
        Remove Message
      </button>
    </div>
  );
};

const SecondMessageCounter = () => {
  const { count, increase, decrease } = useMessageCounter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Message Counter #2</h1>

      <p>Total Messages: {count}</p>

      <button type="button" onClick={increase}>
        Add Message
      </button>

      <button type="button" onClick={decrease}>
        Remove Message
      </button>
    </div>
  );
};

const App = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
    }}
  >
    <FirstCounter />

    <FirstMessageCounter />

    <SecondCounter />

    <SecondMessageCounter />
  </div>
);

export default App;
