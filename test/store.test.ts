import { beforeEach, expect, test, vi } from "vitest";

import store from "../src/store";

beforeEach(() => {
  store.clearStates();
});

const addNewSetter = (stateKey?: string) => {
  const stk = stateKey || "test";
  const initialValue = 0;
  const setterKey = store.generateId();
  const setter = vi.fn(() => {});

  store.addSetter({
    stateKey: stk,
    setterKey,
    setter,
    initialValue,
  });

  return {
    stateKey: stk,
    setterKey,
    setter,
    initialValue,
  };
};

test("Initial data value", () => {
  expect(Object.keys(store.mappedData).length).toBe(0);
});

test("Generate ids are unique", () => {
  const firstId = store.generateId();
  expect(firstId).toBeTruthy();

  const secondId = store.generateId();
  expect(secondId).toBeTruthy();

  expect(firstId).not.toEqual(secondId);
});

test("Adding setter", () => {
  const { stateKey, setterKey } = addNewSetter();

  expect(store.getCurrentSetter({ stateKey, setterKey })).toBeTruthy();

  const { setterKey: newSetterKey } = addNewSetter(stateKey);

  expect(
    store.getCurrentSetter({ stateKey, setterKey: newSetterKey }),
  ).toBeTruthy();
  expect(Object.keys(store.mappedData[stateKey].setters)).toHaveLength(2);
});

test("Updating state", () => {
  const { stateKey, setter } = addNewSetter();

  const newValue = 250;
  store.updateState({ stateKey, value: newValue });

  expect(setter).toBeCalledTimes(1);
  expect(setter).toBeCalledWith(newValue);
  expect(store.mappedData[stateKey].value).toEqual(newValue);
});

test("Getting current state", () => {
  const { stateKey } = addNewSetter();

  const newValue = 100;
  store.updateState({ stateKey, value: newValue });

  expect(store.mappedData[stateKey].value).toEqual(newValue);
  expect(store.mappedData[stateKey].value).toEqual(
    store.getCurrentState(stateKey),
  );
});

test("Removing setter", () => {
  const { stateKey, setterKey } = addNewSetter();

  store.removeSetter({ stateKey, setterKey });

  expect(store.getCurrentSetter({ stateKey, setterKey })).toBeFalsy();
});

test("Clearing state", () => {
  const { setter } = addNewSetter();

  store.clearStates();

  expect(setter).toBeCalledTimes(1);
  expect(Object.keys(store.mappedData)).toHaveLength(0);
});
