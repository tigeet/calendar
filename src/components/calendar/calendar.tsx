import { cn } from "@bem-react/classname";
import React, { memo } from "react";
import "./calendar.css";
import { getFirstDayOfMonth } from "@utils/getFirstDayOfMonth";
import { getLastDayOfMonth } from "@utils/getLastDayOfMonth";
import { createDateRange } from "@utils/createDateRange";
import { WEEKDAY } from "@utils/getWeekdayName";
import Todo from "@components/todo/todo";
import { useDate } from "@hooks/useDate";

const cnCalendar = cn("calendar");
const Calendar = () => {
  const { date } = useDate();
  const firstDay = getFirstDayOfMonth(date);
  const lastDay = getLastDayOfMonth(date);
  const dateRange = createDateRange(firstDay, lastDay);

  return (
    <div className={cnCalendar()}>
      <div className={cnCalendar("header")}>
        {WEEKDAY.map((weekday) => (
          <span key={weekday} className={cnCalendar("weekday")}>
            {weekday}
          </span>
        ))}
      </div>

      <div className={cnCalendar("content")}>
        {dateRange.map((d) => (
          <Todo
            limit={3}
            date={d}
            key={d.getTime()}
            isFiller={date.getMonth() !== d.getMonth()}
          />
        ))}
      </div>
    </div>
  );
};
export default memo(Calendar);
