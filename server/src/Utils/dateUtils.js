export const isOneWeekBefore = (goalDate) => {
  const today = new Date();
  const oneWeekBefore = new Date(goalDate);
  oneWeekBefore.setDate(oneWeekBefore.getDate() - 7);
  return today.toDateString() === oneWeekBefore.toDateString();
};