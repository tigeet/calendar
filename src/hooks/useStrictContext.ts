import { useContext } from "react";

function useStrictContext<T>(context: React.Context<T>, contextName: string) {
  const value = useContext(context);
  if (!value) throw new Error(`${contextName} is not defined`);
  return value;
}

export default useStrictContext;
