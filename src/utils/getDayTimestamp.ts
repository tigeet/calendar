import { getDay } from "./getDay";

export const getTimestampOfDay = (date: Date): number => {
  const day = getDay(date);
  return day.getTime();
};
