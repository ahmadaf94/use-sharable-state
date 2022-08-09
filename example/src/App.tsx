import { useSharableState } from "use-sharable-state";

const FirstUserCounter = () => {
  const [count, setCount] = useSharableState("userCounter", 0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>User Counter #1</h1>

      <p>{count}</p>

      <button type="button" onClick={() => setCount(count + 1)}>
        Add User
      </button>
    </div>
  );
};

const SecondUserCounter = () => {
  const [count, setCount] = useSharableState("userCounter", 0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>User Counter #2</h1>

      <p>{count}</p>

      <button type="button" onClick={() => setCount(count + 1)}>
        Add User
      </button>
    </div>
  );
};

const FirstMessageCounter = () => {
  const [count, setCount] = useSharableState("messageCounter", 0);

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

      <p>{count}</p>

      <button type="button" onClick={() => setCount(count + 1)}>
        Add Message
      </button>
    </div>
  );
};

const SecondMessageCounter = () => {
  const [count, setCount] = useSharableState("messageCounter", 0);

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

      <p>{count}</p>

      <button type="button" onClick={() => setCount(count + 1)}>
        Add Message
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
    <FirstUserCounter />

    <FirstMessageCounter />

    <SecondUserCounter />

    <SecondMessageCounter />
  </div>
);

export default App;
