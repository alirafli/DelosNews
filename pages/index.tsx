import type { NextPage } from "next";
import { Meta, Text, SimpleArticleCard } from "@components/elements";
import { TopFour } from "@components/modules";
import JUMBOTRON from "@assets/images/exciting-news-amico.svg";
import Image from "next/image";
import {
  getArticlesEmailed,
  getArticlesShared,
  getArticlesViewed,
} from "fetches/article";
import { useEffect, useState } from "react";
import { ArticleData } from "@types";

const Home: NextPage = () => {
  const [emailedArticle, setEmailedArticle] = useState<ArticleData[]>([]);
  const [sharedArticle, setSharedArticle] = useState<ArticleData[]>([]);
  const [viewedArticle, setViewedArticle] = useState<ArticleData[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const fetchArticles = async () => {
    try {
      const ArticlesEmailed = await getArticlesEmailed(7);
      setEmailedArticle(ArticlesEmailed.data.results);

      const ArticlesShared = await getArticlesShared(7);
      setSharedArticle(ArticlesShared.data.results);

      const ArticlesViewed = await getArticlesViewed(7);
      setViewedArticle(ArticlesViewed.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchArticles();
  }, []);

  return (
    <div className="py-28 px-10 xl:px-20 min-h-screen">
      <Meta subTitle="Homepage" />

      <div className="flex flex-col-reverse md:flex-row items-center justify-between mb-40">
        <Text
          variant="jumboTitle"
          className="md:w-1/2 text-center md:text-left"
        >
          Get <span className="text-primary">the Best</span> of The New York
          Times Article with DelosNews: Your One-Stop Shop!
        </Text>
        <Image
          alt="jumbotron"
          src={JUMBOTRON}
          width={350}
          className="px-5 md:px-0 mb-7 md:mb-0 "
        />
      </div>
      {isLoading ? (
        <Text>loading...</Text>
      ) : (
        <>
          <TopFour title="Most Emailed">
            {emailedArticle.slice(0, 4).map((data, key) => {
              return (
                <SimpleArticleCard
                  key={key}
                  id={data.id}
                  link={data.url}
                  title={data.title}
                  writer={data.byline}
                  uri={data.uri}
                  background={data?.media[0]["media-metadata"][2]?.url}
                />
              );
            })}
          </TopFour>

          <TopFour title="Most Shared">
            {sharedArticle.slice(0, 4).map((data, key) => {
              return (
                <SimpleArticleCard
                  uri={data.uri}
                  key={key}
                  id={data.id}
                  link={data.url}
                  title={data.title}
                  writer={data.byline}
                  background={data?.media[0]["media-metadata"][2]?.url}
                />
              );
            })}
          </TopFour>

          <TopFour title="Most Viewed">
            {viewedArticle.slice(0, 4).map((data, key) => {
              return (
                <SimpleArticleCard
                  uri={data.uri}
                  key={key}
                  id={data.id}
                  link={data.url}
                  title={data.title}
                  writer={data.byline}
                  background={data?.media[0]["media-metadata"][2]?.url}
                />
              );
            })}
          </TopFour>
        </>
      )}
    </div>
  );
};

export default Home;
