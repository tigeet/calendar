import { cn } from "@bem-react/classname";
import React, { memo } from "react";
import { getFirstDayOfMonth } from "@utils/getFirstDayOfMonth";
import { getLastDayOfMonth } from "@utils/getLastDayOfMonth";
import { createDateRange } from "@utils/createDateRange";
import Todo from "@components/todo/todo";
import { useDate } from "@hooks/useDate";

const cnCalendar = cn("calendar");
import "./calendar.css";

const Calendar = () => {
  const { date } = useDate();
  const firstDay = getFirstDayOfMonth(date);
  const lastDay = getLastDayOfMonth(date);
  const dateRange = createDateRange(firstDay, lastDay);

  return (
    <div className={cnCalendar()}>
      {dateRange.map((d) => (
        <Todo
          limit={3}
          date={d}
          key={d.getTime()}
          isFiller={date.getMonth() !== d.getMonth()}
        />
      ))}
    </div>
  );
};
export default memo(Calendar);
