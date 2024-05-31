import { getDay } from "./getDay";

export function getNextWeek(date: Date) {
  const day = getDay(date);

  const nextWeekDate = new Date(day);
  nextWeekDate.setDate(day.getDate() + 7);

  return nextWeekDate;
}
