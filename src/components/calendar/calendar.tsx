import { cn } from "@bem-react/classname";
import React, { memo } from "react";
import "./calendar.css";
import { getFirstDayOfMonth } from "@utils/getFirstDayOfMonth";
import { getLastDayOfMonth } from "@utils/getLastDayOfMonth";
import { createDateRange } from "@utils/createDateRange";
import { WEEKDAY } from "@utils/getWeekdayName";
import Todo from "../todo/todo";
import { useDate } from "@hooks/useDate";

const cnCalendar = cn("calendar");
const Calendar = () => {
  const { date } = useDate();
  const firstDay = getFirstDayOfMonth(date);
  const lastDay = getLastDayOfMonth(date);
  const dateRange = createDateRange(firstDay, lastDay);

  return (
    <div className={cnCalendar()}>
      {WEEKDAY.map((weekday) => (
        <span key={weekday} className={cnCalendar("weekday")}>
          {weekday}
        </span>
      ))}
      {dateRange.map((d) => (
        <Todo
          limit={2}
          date={d}
          key={d.toISOString()}
          isFiller={date.getMonth() !== d.getMonth()}
        />
      ))}
    </div>
  );
};
export default memo(Calendar);
