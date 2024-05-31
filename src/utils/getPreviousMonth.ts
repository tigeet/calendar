import { getDay } from "./getDay";

export const getPreviousMonth = (date: Date) => {
  const day = getDay(date);
  const month = day.getMonth();
  const year = day.getFullYear();

  return new Date(year, month - 1, 1);
};
