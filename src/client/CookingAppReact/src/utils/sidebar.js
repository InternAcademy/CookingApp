export const orderedSections = [
  "Today",
  "Yesterday",
  "Previous 7 days",
  "Previous 30 days",
  "Older than 30 days",
];
export const getSectionTitle = (date) => {
  const today = new Date();
  const chatDate = new Date(date);

  today.setHours(0, 0, 0, 0);
  chatDate.setHours(0, 0, 0, 0);

  const diffTime = today - chatDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return "Previous 7 days";
  if (diffDays <= 30) return "Previous 30 days";
  return "Older than 30 days";
};
