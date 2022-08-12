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
