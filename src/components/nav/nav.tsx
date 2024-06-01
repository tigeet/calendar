import { cn } from "@bem-react/classname";
import { useDate } from "@hooks/useDate";
import { View } from "@src/types";
import { getMonthName } from "@utils/getMonthName";
import { getNextMonth } from "@utils/getNextMonth";
import { getPreviousMonth } from "@utils/getPreviousMonth";
import React, { memo, useCallback } from "react";
import IconButton from "@components/iconButton/iconButton";
import PrevIcon from "@static/chevron-left.svg";
import NextIcon from "@static/chevron-right.svg";
import "./nav.css";
import { getDay } from "@utils/getDay";
import { getPreviousWeek } from "@utils/getPreviousWeek";
import { getNextWeek } from "@utils/getNextWeek";
import ProfileButton from "@components/profileButton/profileButton";
const cnNav = cn("nav");

type Props = {
  view: View;
  onViewChange: (view: View) => void;
};

const Nav = ({ view, onViewChange }: Props) => {
  const { date, setDate } = useDate();

  const handlePrevPage = useCallback(
    () =>
      setDate((date) =>
        view === "month" ? getPreviousMonth(date) : getPreviousWeek(date)
      ),
    [setDate, view]
  );

  const handleNextPage = useCallback(
    () =>
      setDate((date) =>
        view === "month" ? getNextMonth(date) : getNextWeek(date)
      ),
    [setDate, view]
  );

  const handleSetToday = useCallback(
    () => setDate(getDay(new Date())),
    [setDate]
  );

  return (
    <nav className={cnNav()}>
      <div className={cnNav("date")}>
        <span className={cnNav("month")}>{getMonthName(date.getMonth())}</span>
        <span className={cnNav("year")}>{date.getFullYear()}</span>
      </div>

      <div className={cnNav("view")}>
        <button
          onClick={() => onViewChange("week")}
          className={cnNav("viewItem", { selected: view === "week" })}
        >
          Week
        </button>
        <button
          onClick={() => onViewChange("month")}
          className={cnNav("viewItem", { selected: view === "month" })}
        >
          Month
        </button>
      </div>

      <div className={cnNav("controls")}>
        <IconButton
          size="md"
          onClick={handlePrevPage}
          icon={<PrevIcon className={cnNav("setPageIcon")} />}
        />
        <button onClick={handleSetToday} className={cnNav("today")}>
          Today
        </button>
        <IconButton
          size="md"
          onClick={handleNextPage}
          icon={<NextIcon className={cnNav("setPageIcon")} />}
        />
      </div>

      <ProfileButton />
    </nav>
  );
};

export default memo(Nav);
