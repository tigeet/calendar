import { useEffect, useMemo } from "react";

type Props = {
  callback: () => void;
  keys: string | string[];
};
const useKeyPress = ({ callback, keys }: Props) => {
  const keysArray = useMemo(
    () => (Array.isArray(keys) ? keys : [keys]),
    [keys]
  );
  
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (keysArray.includes(event.code)) {
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [callback, keysArray]);
};

export default useKeyPress;
