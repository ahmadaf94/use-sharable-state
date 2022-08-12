import React, { createRef, forwardRef, useImperativeHandle } from "react";
import { expect, test, beforeEach } from "vitest";
import TestRenderer from "react-test-renderer";

import { useSharableState, Dispatch } from "../src";

import store from "../src/store";

const TestComponent = forwardRef<
  { setState: (state: number) => void },
  { stateKey: string; initialState: number }
>(({ stateKey, initialState }, ref) => {
  const [state, setState] = useSharableState(stateKey, initialState);

  useImperativeHandle(
    ref,
    () => ({
      setState,
    }),
    [setState],
  );

  return <span id="state">{state}</span>;
});

class TestWrapperClassComponent extends React.Component<
  {
    stateKey: string;
    initialState: number;
  },
  {}
> {
  testRef = createRef<{ setState: Dispatch<number> }>();

  render() {
    const { initialState, stateKey } = this.props;

    return (
      <TestComponent
        ref={this.testRef}
        initialState={initialState}
        stateKey={stateKey}
      />
    );
  }
}

const delay = (time?: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

beforeEach(() => {
  store.clearStates();
});

test("should return initialState", async () => {
  const initialState = 0;
  const stateKey = "test";

  const component = TestRenderer.create(
    <TestComponent initialState={initialState} stateKey={stateKey} />,
  );

  const state = (await component.root.findByProps({ id: "state" })).children[0];

  expect(state).toEqual(initialState.toString());

  component.unmount();
});

test("should remove setter on unmount", async () => {
  const initialState = 0;
  const stateKey = "test";

  const component = TestRenderer.create(
    <TestComponent initialState={initialState} stateKey={stateKey} />,
  );

  component.unmount();

  await delay();

  expect(Object.keys(store.mappedData[stateKey].setters)).toHaveLength(0);
});

test("should update state by value", async () => {
  const initialState = 0;
  const stateKey = "test";

  const component = TestRenderer.create(
    <TestWrapperClassComponent
      initialState={initialState}
      stateKey={stateKey}
    />,
  );

  await delay();

  const newState = 25;

  component.root.instance.testRef.current.setState(newState);

  await delay();

  const state = (await component.root.findByProps({ id: "state" })).children[0];

  expect(state).toEqual(newState.toString());

  component.unmount();
});

test("should update state by function", async () => {
  const initialState = 0;
  const stateKey = "test";

  const component = TestRenderer.create(
    <TestWrapperClassComponent
      initialState={initialState}
      stateKey={stateKey}
    />,
  );

  await delay();

  const addedValue = 25;
  const result = 25;

  component.root.instance.testRef.current.setState((oldState: number) => {
    return oldState + addedValue;
  });

  await delay();

  const state = (await component.root.findByProps({ id: "state" })).children[0];

  expect(state).toEqual(result.toString());

  component.unmount();
});
