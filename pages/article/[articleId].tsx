import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getArticleDetail } from "fetches/article";
import { SingleArticleData } from "@types";
import { Meta, Text } from "@components/elements";
import Image from "next/image";
import { readableDate } from "@utils";
import styles from "@styles/ArticleId.module.css";


const ArticleDetail = () => {
  const router = useRouter();
  const { uri } = router.query;
  const [article, setArticle] = useState<SingleArticleData>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const fetchArticleDetail = async (uri?: string | string[]) => {
    try {
      const ArticleDetail = await getArticleDetail(uri);
      setArticle(ArticleDetail.data.response.docs[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchArticleDetail(uri);
  }, [uri]);

  if (isLoading) return <h1 className="pt-28 min-h-screen">loading...</h1>;
  return (
    <div className={styles.container}>
      <Meta subTitle="article detail" />

      <div className={styles.wrapper}>
        <Image
          src={`https://static01.nyt.com/${article?.multimedia[0].url}`}
          alt="Picture of the author"
          width={400}
          height={400}
          className="mb-10"
        />
        <div className={styles.content}>
          <Text className="text-center md:text-left">
            {article?.headline.main}
          </Text>
          <div className={styles.dateWriterWrapper}>
            <Text variant="p">{readableDate(article?.pub_date)}</Text>
            <Text variant="p" className="mx-5">
              {article?.byline.original}
            </Text>
          </div>
          <Text variant="subTitle" className={styles.abstract}>
            abstract: {article?.abstract}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
