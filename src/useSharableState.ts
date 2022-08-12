import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import store from "./store";

type Action<S> = (prevState: S) => S;
export type Dispatch<S> = (value: S | Action<S>) => void;

export const useSharableState = <S>(
  stateKey: string,
  initialState?: S,
): [S, Dispatch<S>] => {
  const setterKey = useRef(store.generateId());

  const initialValue = useMemo(
    () => store.getCurrentState(stateKey) || initialState,
    [initialState, stateKey],
  );

  const [state, setState] = useState<S>(initialValue);

  useEffect(() => {
    const stk = setterKey.current;

    if (!store.getCurrentSetter({ stateKey, setterKey: setterKey.current })) {
      store.addSetter({
        stateKey,
        initialValue,
        setter: setState,
        setterKey: stk,
      });
    }

    return () => store.removeSetter({ stateKey, setterKey: stk });
  }, [initialValue, stateKey]);

  const updateState: Dispatch<S> = useCallback(
    (value) => {
      if (typeof value === "function") {
        store.updateState({
          stateKey,
          value: (value as Action<S>)(store.getCurrentState(stateKey)),
        });
      } else {
        store.updateState({ stateKey, value });
      }
    },
    [stateKey],
  );

  return [state, updateState];
};
