import { APIResponse, ArticleData, SingleArticleData } from "@types";
import api from "pages/api";

export const getArticlesEmailed = (
  period: number
): APIResponse<SingleArticleData> => {
  return api.get(
    `mostpopular/v2/emailed/${period}.json?api-key=${process.env.NEXT_PUBLIC_NYTIMES_API_KEY}`
  );
};

export const getArticlesShared = (period: number): APIResponse<SingleArticleData> => {
  return api.get(
    `mostpopular/v2/shared/${period}.json?api-key=${process.env.NEXT_PUBLIC_NYTIMES_API_KEY}`
  );
};

export const getArticlesViewed = (period: number): APIResponse<SingleArticleData> => {
  return api.get(
    `mostpopular/v2/viewed/${period}.json?api-key=${process.env.NEXT_PUBLIC_NYTIMES_API_KEY}`
  );
};

export const getArticleDetail = (
  uri?: string | string[]
): APIResponse<SingleArticleData> => {
  return api.get(
    `search/v2/articlesearch.json?fq=_id%3A"${uri}"&api-key=${process.env.NEXT_PUBLIC_NYTIMES_API_KEY}`
  );
};

export const getArticleSearch = (
  term?: string,
  page?: number
): APIResponse<SingleArticleData> => {
  let newPage = page ? page : 0;
  return api.get(
    `search/v2/articlesearch.json?q=${term}&page=${newPage}&api-key=${process.env.NEXT_PUBLIC_NYTIMES_API_KEY}`
  );
};
