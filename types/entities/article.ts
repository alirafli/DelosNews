export type ArticleData = {
  title: string;
  byline: string;
  url: string;
  uri: string;
  id: number;
  web_url: string;
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
  section_name: string;
  type_of_material: string;
  pub_date: string;
  byline: {
    original: string;
  };
} & ArticleData;
