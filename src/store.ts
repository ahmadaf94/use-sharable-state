const store = (<F extends (state: any) => void, S = any>() => {
  const generateId = () => {
    return (Date.now().toString(36) + Math.random().toString(36)).replace(
      /\./g,
      "",
    );
  };

  const mappedData: { [K: string]: { value: S; setters: { [K: string]: F } } } =
    {};

  const addSetter = ({
    stateKey,
    setterKey,
    setter,
    initialValue,
  }: {
    stateKey: string;
    setterKey: string;
    setter: F;
    initialValue?: any;
  }) => {
    if (mappedData[stateKey]) {
      mappedData[stateKey].setters[setterKey] = setter;
    } else {
      mappedData[stateKey] = {
        value: initialValue,
        setters: { [setterKey]: setter },
      };
    }
  };

  const removeSetter = ({
    stateKey,
    setterKey,
  }: {
    stateKey: string;
    setterKey: string;
  }) => {
    if (mappedData[stateKey]?.setters[setterKey]) {
      delete mappedData[stateKey].setters[setterKey];
    }
  };

  const updateState = ({
    stateKey,
    value,
  }: {
    stateKey: string;
    value: any;
  }) => {
    const data = mappedData[stateKey];

    if (data) {
      data.value = value;

      Object.entries(data.setters).forEach(([, setter]) => {
        setter(value);
      });
    }
  };

  const getCurrentState = (stateKey: string) => {
    return mappedData[stateKey]?.value;
  };

  const getCurrentSetter = ({
    stateKey,
    setterKey,
  }: {
    stateKey: string;
    setterKey: string;
  }) => {
    return mappedData[stateKey]?.setters[setterKey];
  };

  const clearStates = () => {
    Object.entries(mappedData).forEach(([stateKey, state]) => {
      if (state.setters) {
        Object.entries(state.setters).forEach(([, setter]) => {
          setter(undefined);
        });
      }

      delete mappedData[stateKey];
    });
  };

  return {
    mappedData,

    addSetter,
    removeSetter,
    updateState,
    getCurrentState,
    getCurrentSetter,
    generateId,
    clearStates,
  };
})();

export default store;
