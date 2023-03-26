import { ArticleCard, Meta, SearchBar, Text } from "@components/elements";
import { useEffectOnce } from "@hooks";
import { SingleArticleData } from "@types";
import { getArticleSearch } from "fetches/article";
import React, { FC, useState } from "react";
import styles from "@styles/Article.module.css";
import { Pagination } from "@components/modules/Pagination";

const Article: FC<any> = () => {
  const [term, setTterm] = useState<string>("everything");
  const [article, setaArticle] = useState<SingleArticleData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTterm(e.target.value);
  };

  const fetchArticles = async (term: string, page: number) => {
    setIsLoading(true);
    try {
      const res = await getArticleSearch(term, page);
      console.log(res);
      setaArticle(res.data.response.docs);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFetchArticle = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
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
          <Text>see article about {term ? term : "...?"}</Text>
          <SearchBar
            name="term"
            onChange={handleChange}
            value={term}
            onSubmit={triggerFetchArticle}
          />
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
                  id="detail"
                  title={data.headline.main}
                  writer={data.byline.original}
                  uri={data.uri}
                  background={`https://static01.nyt.com/${data?.multimedia[0]?.url}`}
                  sectionName={data.section_name}
                  typeOfMaterial={data.type_of_material}
                  pubDate={data.pub_date}
                />
              );
            })}
          </div>
        )}
      </div>
      <Pagination
        setPage={setPage}
        onSubmit={triggerFetchArticle}
        page={page}
      />
    </div>
  );
};

export default Article;
