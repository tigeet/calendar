import { useEffect, useState } from "react";

type Props<T> = {
  key: string;
  defaultValue: T;
};

const useUrlState = <T>({ key, defaultValue }: Props<T>) => {
  const [state, setState] = useState<T>(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (state === defaultValue) {
      params.delete(key);
    } else {
      params.set(key, JSON.stringify(state));
    }

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }, [state, key, defaultValue]);

  return [state, setState] as const;
};

export default useUrlState;
