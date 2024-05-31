import useUrlState from "@hooks/useUrlState";
import { getTimestampOfDay } from "@utils/getDayTimestamp";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
} from "react";
type Props = {
  children?: React.ReactNode;
};

type TDateContext = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
};

export const DateContext = createContext<null | TDateContext>(null);

const defaultDate = getTimestampOfDay(new Date());
export const DateProvider = ({ children }: Props) => {
  const [date, setUrlDate] = useUrlState({
    key: "page",
    defaultValue: defaultDate,
  });

  const setDate: Dispatch<SetStateAction<Date>> = useCallback(
    (action) => {
      if (action instanceof Function)
        setUrlDate((date) => action(new Date(date)).getTime());
      else setUrlDate(action.getTime());
    },
    [setUrlDate]
  );

  return (
    <DateContext.Provider value={{ date: new Date(date), setDate }}>
      {children}
    </DateContext.Provider>
  );
};
