import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getArticleDetail } from "fetches/article";
import { SingleArticleData } from "@types";
import { Button, Meta, Text } from "@components/elements";
import Image from "next/image";
import { getDayMonthYear, getPrice, readableDate } from "@utils";
import styles from "@styles/ArticleId.module.css";
import DEFAULTIMAGE from "@assets/images/default-card.jpg";
import { useAuth } from "context/AuthContext";

const ArticleDetail = () => {
  const { userBuyArticle, user, getUserDataByEmail } = useAuth();

  const router = useRouter();
  const { uri } = router.query;
  const [article, setArticle] = useState<SingleArticleData>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [articleDate, setArticleDate] = useState<any>("");
  const [userLogin, setUserLogin] = useState({
    coin: 100000,
    email: "a@a.com",
    ticket: 0,
    username: "aaaaaa",
  });

  const { day, month, year } = getDayMonthYear(articleDate);
  const getArticlePrice = getPrice(day, month, year);

  const fetchArticleDetail = async (uri?: string | string[]) => {
    try {
      const ArticleDetail = await getArticleDetail(uri);
      setArticle(ArticleDetail.data.response.docs[0]);
      setArticleDate(ArticleDetail.data.response.docs[0].pub_date);

      const res = await getUserDataByEmail(user?.email);
      setUserLogin(res[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const buyArticle = async () => {
    try {
      setIsLoading(true);
      await userBuyArticle(
        user?.email,
        article?.web_url,
        article?.headline.main,
        getArticlePrice.value,
        userLogin.coin,
        userLogin.ticket
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      router.push("/profile");
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
          src={
            article?.multimedia[0]
              ? `https://static01.nyt.com/${article?.multimedia[0].url}`
              : DEFAULTIMAGE
          }
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

          <div className="mx-auto w-fit">
            <Button onClick={buyArticle}>
              Buy this article for{" "}
              <span className="font-bold">{getArticlePrice.output}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
