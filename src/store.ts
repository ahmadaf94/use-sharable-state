const store = (<F extends (state: any) => void, S = any>() => {
  let setterId = 0;

  const generateId = () => {
    setterId += 1;

    return setterId.toString();
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

  return {
    addSetter,
    removeSetter,
    updateState,
    getCurrentState,
    getCurrentSetter,
    generateId,
  };
})();

export default store;
