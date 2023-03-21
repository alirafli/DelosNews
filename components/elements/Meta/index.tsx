import Head from "next/head";
import { FC } from "react";

type HeaderProps = {
  subTitle: string;
};

export const Meta: FC<HeaderProps> = ({ subTitle = "..." }) => {
  const metaData = {
    description:
      "Get the Best of The New York Times Article with DelosNews: Your One-Stop Shop!",
    keywords: "Delos, Articles, News, Ocean",
  };

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={metaData.keywords} />
      <meta name="description" content={metaData.description} />
      <meta charSet="utf-8" />
      <link
        rel="icon"
        href="favicon/logo.svg"
        media="(prefers-color-scheme: dark)"
      />
      <link
        rel="icon"
        href="favicon/logo-dark.svg"
        media="(prefers-color-scheme: light)"
      />
      <title>DelosNews | {subTitle}</title>
    </Head>
  );
};
