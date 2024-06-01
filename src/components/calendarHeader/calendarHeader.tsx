import { cn } from "@bem-react/classname";
import { WEEKDAY } from "@utils/getWeekdayName";
import React, { memo } from "react";

import "./calendarHeader.css";

const cnCalendarHeader = cn("calendarHeader");
const CalendarHeader = () => {
  return (
    <div className={cnCalendarHeader()}>
      {WEEKDAY.map((weekday) => (
        <span key={weekday} className={cnCalendarHeader("day")}>
          {weekday}
        </span>
      ))}
    </div>
  );
};

export default memo(CalendarHeader);
