export const readableDate = (timestamp: any) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  } as const;

  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, options);
};
