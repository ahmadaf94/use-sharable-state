import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";

import store from "./store";

const useSharableState = <S>(
  stateKey: string,
  initialState?: S,
): [S, (newState: S) => void] => {
  const setterKey = useRef(uuidV4());

  const initialValue = useMemo(
    () => store.getCurrentState(stateKey) || initialState,
    [initialState, stateKey],
  );

  const [state, setState] = useState<S>(initialValue);

  useEffect(() => {
    if (!store.getCurrentSetter({ stateKey, setterKey: setterKey.current })) {
      store.addSetter({
        stateKey,
        initialValue,
        setter: setState,
        setterKey: setterKey.current,
      });
    }

    const stk = setterKey.current;

    return () => store.removeSetter({ stateKey, setterKey: stk });
  }, [initialValue, stateKey]);

  const updateState = useCallback(
    (newState: S) => {
      store.updateState({ stateKey, value: newState });
    },
    [stateKey],
  );

  return [state, updateState];
};

export default useSharableState;
