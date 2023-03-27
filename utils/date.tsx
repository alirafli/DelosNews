export const readableDate = (timestamp: any) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  } as const;

  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, options);
};

export const getDayMonthYear = (timestamp = "now") => {
  let date = new Date();
  if (timestamp !== "now") date = new Date(timestamp);
  const day = Number(date.getDate());
  const month = Number(date.getMonth() + 1);
  const year = Number(date.getFullYear());

  return { day, month, year };
};
