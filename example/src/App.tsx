import { useSharableState } from 'use-sharable-state/lib/esm';

function Child() {
    const [count, setCount] = useSharableState('counter', 0)

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <p>{count}</p>
            <button type="button" onClick={() => setCount(count + 1)}>
                increase
            </button>
        </div>
    )
}

function AnotherChild() {
    const [count, setCount] = useSharableState('counter', 0)

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <p>{count}</p>
            <button type="button" onClick={() => setCount(count + 1)}>
                increase
            </button>
        </div>
    )
}

function App() {
  const [count, setCount] = useSharableState('counter', 0)

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
      <p>{count}</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        increase
      </button>

        <Child />

        <AnotherChild />
    </div>
  )
}

export default App
