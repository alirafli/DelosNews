import { APIResponse, ArticleData, SingleArticleData } from "@types";
import api from "pages/api";

export const getArticlesEmailed = (
  period: number
): APIResponse<ArticleData> => {
  return api.get(
    `mostpopular/v2/emailed/${period}.json?api-key=${process.env.NEXT_PUBLIC_NYTIMES_API_KEY}`
  );
};

export const getArticlesShared = (period: number): APIResponse<ArticleData> => {
  return api.get(
    `mostpopular/v2/shared/${period}.json?api-key=${process.env.NEXT_PUBLIC_NYTIMES_API_KEY}`
  );
};

export const getArticlesViewed = (period: number): APIResponse<ArticleData> => {
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
