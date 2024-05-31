export const getLastDayOfMonth = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();

  const lastDateOfMonth = new Date(year, month + 1, 0);

  const lastDayOfWeek = lastDateOfMonth.getDay() || 7;

  const lastDate = new Date(lastDateOfMonth);
  lastDate.setDate(lastDateOfMonth.getDate() + (7 - lastDayOfWeek));

  return lastDate;
};
