import { getDay } from "./getDay";

export function getLastDayOfWeek(date: Date) {
  const currentDate = getDay(date);
  const currentDay = currentDate.getDay();
  const diff = currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
  const lastDay = new Date(currentDate.setDate(diff + 6));

  return lastDay;
}
