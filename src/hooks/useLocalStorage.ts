import { Dispatch, SetStateAction, useCallback, useState } from "react";

type Props<T> = {
  key: string;
  defaultValue: T;
};

export function useLocalStorage<T>({
  key,
  defaultValue,
}: Props<T>): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return defaultValue;

    try {
      return JSON.parse(storedValue);
    } catch {
      return defaultValue;
    }
  });

  const handleSetValue: Dispatch<SetStateAction<T>> = useCallback(
    (action) => {
      const computedValue = action instanceof Function ? action(value) : value;
      setValue(computedValue);
      localStorage.setItem(key, JSON.stringify(computedValue));
    },
    [key, value]
  );

  return [value, handleSetValue];
}
