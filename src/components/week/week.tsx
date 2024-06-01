import { cn } from "@bem-react/classname";
import React, { memo } from "react";
import { createDateRange } from "@utils/createDateRange";
import { WEEKDAY } from "@utils/getWeekdayName";
import Todo from "@components/todo/todo";
import { useDate } from "@hooks/useDate";
import { getFirstDayOfWeek } from "@utils/getFirstDayOfWeek";
import { getLastDayOfWeek } from "@utils/getLastDayOfWeek";

import "./week.css";
import CalendarHeader from "../calendarHeader/calendarHeader";
const cnWeek = cn("week");

const Week = () => {
  const { date } = useDate();
  const firstDay = getFirstDayOfWeek(date);
  const lastDay = getLastDayOfWeek(date);
  const dateRange = createDateRange(firstDay, lastDay);

  return (
    <div className={cnWeek()}>
      <CalendarHeader />
      <div className={cnWeek("content")}>
        {dateRange.map((d) => (
          <Todo
            limit={29}
            date={d}
            key={d.getTime()}
            isFiller={date.getMonth() !== d.getMonth()}
          />
        ))}
      </div>
    </div>
  );
};
export default memo(Week);
