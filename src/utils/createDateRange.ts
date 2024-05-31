export const createDateRange = (from: Date, to: Date) => {
  const dates = [];

  for (let i = from; i <= to; i.setDate(i.getDate() + 1)) {
    dates.push(new Date(i));
  }
  return dates;
};
