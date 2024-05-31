import { getDay } from "./getDay";

export function getPreviousWeek(date: Date) {
  const day = getDay(date);

  const previousWeekDate = new Date(day);
  previousWeekDate.setDate(day.getDate() - 7);

  return previousWeekDate;
}
