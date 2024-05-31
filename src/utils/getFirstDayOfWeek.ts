import { getDay } from "./getDay";

export function getFirstDayOfWeek(date: Date) {
  const currentDate = getDay(date);
  const currentDay = currentDate.getDay();
  const diff = currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
  const firstDay = new Date(currentDate.setDate(diff));

  return firstDay;
}
