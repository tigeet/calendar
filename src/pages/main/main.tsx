import React, { memo, useCallback } from "react";
import Calendar from "@components/calendar/calendar";
import { cn } from "@bem-react/classname";
import ActionButton from "@components/actionButton/actionButton";
import PlusIcon from "@static/plus.svg";

import "./main.css";
import { useModal } from "@hooks/useModal";
import Modal from "@components/modal/modal";
import { useDate } from "@hooks/useDate";
import Nav from "@components/nav/nav";
import { getDay } from "@utils/getDay";
import { View } from "@src/types";
import Week from "@components/week/week";
import useUrlState from "@hooks/useUrlState";
import CalendarHeader from "@src/components/calendarHeader/calendarHeader";
const cnMain = cn("main");
const Main = () => {
  const { visible, open, date: modalDate } = useModal();
  const { setDate } = useDate();
  const [view, setView] = useUrlState<"month" | "week">({
    key: "view",
    defaultValue: "month",
  });

  const handleSetView = useCallback(
    (view: View) => {
      setView(view);
      setDate(getDay(new Date()));
    },
    [setDate, setView]
  );
  return (
    <div className={cnMain()}>
      <Nav view={view} onViewChange={handleSetView} />
      <main className={cnMain("main")}>
        <CalendarHeader />
        {view === "month" ? <Calendar /> : <Week />}
        <ActionButton className={cnMain("actionButton")} onClick={() => open()}>
          <PlusIcon className={cnMain("actionButtonIcon")} />
        </ActionButton>
      </main>

      {visible && (
        <Modal className={cnMain("modal")} key={modalDate.toISOString()} />
      )}
    </div>
  );
};
export default memo(Main);
