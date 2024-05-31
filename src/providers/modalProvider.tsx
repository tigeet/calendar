import useUrlState from "@hooks/useUrlState";
import { getTimestampOfDay } from "@utils/getDayTimestamp";
import React, { createContext, useCallback } from "react";
type Props = {
  children?: React.ReactNode;
};

type TModalContext = {
  visible: boolean;
  date: Date;
  open: (date?: Date) => void;
  close: () => void;
};

export const ModalContext = createContext<null | TModalContext>(null);

const defaultDate = getTimestampOfDay(new Date());

export const ModalProvider = ({ children }: Props) => {
  const [visible, setVisible] = useUrlState({
    key: "modalopen",
    defaultValue: false,
  });

  const [date, setDate] = useUrlState({
    key: "modaldate",
    defaultValue: defaultDate,
  });

  const open = useCallback(
    (date?: Date) => {
      setVisible(true);
      setDate(date?.getTime() ?? defaultDate);
    },
    [setDate, setVisible]
  );

  const close = useCallback(() => {
    setVisible(false);
    setDate(defaultDate);
  }, [setDate, setVisible]);

  return (
    <ModalContext.Provider
      value={{ visible, date: new Date(date), open, close }}
    >
      {children}
    </ModalContext.Provider>
  );
};
