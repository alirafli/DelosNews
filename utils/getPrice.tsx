import { getDayMonthYear } from "./date";

export const getPrice = (
  articleDay: number,
  articleMonth: number,
  articleYear: number
) => {
  const { day, month, year } = getDayMonthYear();

  if (articleYear - year <= -1) return { output: "Free!", value: 0 };

  if (articleMonth - month <= -1) return { output: "Free!", value: 0 };

  if (day - articleDay <= 1) return { output: "50.000 coins!", value: 50000 };
  if (day - articleDay <= 7) return { output: "20.000 coins!", value: 20000 };

  return { output: "Free!", value: 0 };
};
