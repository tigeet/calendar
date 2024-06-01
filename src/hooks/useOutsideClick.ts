import { RefObject, useCallback, useEffect, useRef } from "react";

type Props = {
  onClick: () => void;
  ignore?: RefObject<HTMLElement>[];
};

const useOutsideClick = <T extends HTMLElement>({ onClick, ignore }: Props) => {
  const ref = useRef<T | null>(null);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        !ignore?.some((ref) => ref.current?.contains(e.target as Node))
      ) {
        onClick();
      }
    },
    [ignore, onClick]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return ref;
};

export default useOutsideClick;
