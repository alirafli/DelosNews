export type ArticleData = {
  title: string;
  byline: string;
  url: string;
  uri: string;
  id: number;
  abstract: string;
  published_date: string;
  pub_date: string;
  headline: {
    main: string;
  };
  multimedia: [
    {
      url: string;
    }
  ];
  media: [
    {
      "media-metadata": [
        {
          url: string;
        },
        {
          url: string;
        },
        {
          url: string;
        }
      ];
    }
  ];
};

export type SingleArticleData = {
  byline: {
    original: string;
  };
} & ArticleData;
