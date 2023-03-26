import {
  ArticleCard,
  Button,
  Meta,
  SearchBar,
  SimpleArticleCard,
  Text,
} from "@components/elements";
import { useEffectOnce } from "@hooks";
import { SingleArticleData } from "@types";
import {
  getArticleSearch,
  getArticlesEmailed,
  getArticlesShared,
  getArticlesViewed,
} from "fetches/article";
import React, { FC, useState } from "react";
import styles from "@styles/Article.module.css";
import { Pagination } from "@components/modules/Pagination";
import { useRouter } from "next/router";

const periodType = [1, 7, 30];

const Article: FC<any> = () => {
  const { query } = useRouter();
  const [term, setTterm] = useState<string>("everything");
  const [article, setaArticle] = useState<SingleArticleData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [period, setPeriod] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTterm(e.target.value);
  };

  const fetchArticles = async (term: string, page: number) => {
    setIsLoading(true);

    try {
      if (query.q === "Most Emailed") {
        const ArticlesEmailed = await getArticlesEmailed(period);
        setaArticle(ArticlesEmailed.data.results);
      }

      if (query.q === "Most Shared") {
        const ArticlesShared = await getArticlesShared(period);
        setaArticle(ArticlesShared.data.results);
      }

      if (query.q === "Most Viewed") {
        const ArticlesViewed = await getArticlesViewed(period);
        setaArticle(ArticlesViewed.data.results);
      }

      if (query.q === undefined) {
        const res = await getArticleSearch(term, page);
        setaArticle(res.data.response.docs);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFetchArticle = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(period);
    fetchArticles(term, page);
  };

  useEffectOnce(() => {
    fetchArticles(term, 0);
  });

  return (
    <div className="min-h-screen mb-10">
      <Meta subTitle="article" />

      <div className={styles.searchWrapper}>
        <div className={styles.searchContent}>
          <Text>
            see {query.q !== undefined ? `${query.q} ` : ""}article{" "}
            {term && query.q === undefined ? `about ${term}` : ""}
          </Text>
          {query.q === undefined && (
            <SearchBar
              name="term"
              onChange={handleChange}
              value={term}
              onSubmit={triggerFetchArticle}
            />
          )}

          {query.q !== undefined && (
            <>
              <Text variant="subTitle" className="mt-5 mb-3">
                Set article period
              </Text>

              <div className="flex">
                {periodType.map((data, key) => {
                  return (
                    <Button
                      key={key}
                      onClick={(e) => {
                        setPeriod(data);
                        triggerFetchArticle(e);
                      }}
                      variant={data === period ? "primary" : "secondary"}
                    >
                      {data}
                    </Button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        {isLoading ? (
          <Text>load data...</Text>
        ) : (
          <div className={styles.cardWrapper}>
            {article.map((data, key) => {
              return (
                <ArticleCard
                  key={key}
                  id={query.q === undefined ? "detail" : data.id.toString()}
                  title={
                    query.q === undefined ? data.headline.main : data.title
                  }
                  writer={
                    query.q === undefined ? data.byline.original : data.byline
                  }
                  uri={data.uri}
                  background={
                    query.q === undefined
                      ? `https://static01.nyt.com/${data?.multimedia[0]?.url}`
                      : ""
                  }
                  sectionName={data.section_name}
                  typeOfMaterial={data.type_of_material}
                  pubDate={
                    query.q === undefined ? data.pub_date : data.published_date
                  }
                />
              );
            })}
          </div>
        )}
      </div>
      {query.q === undefined && (
        <Pagination
          setPage={setPage}
          onSubmit={triggerFetchArticle}
          page={page}
        />
      )}
    </div>
  );
};

export default Article;
