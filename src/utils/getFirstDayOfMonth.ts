export const getFirstDayOfMonth = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);

  const firstDayOfWeek = firstDayOfMonth.getDay() || 7;

  const firstDate = new Date(firstDayOfMonth);
  firstDate.setDate(firstDayOfMonth.getDate() - (firstDayOfWeek - 1));

  return firstDate;
};
