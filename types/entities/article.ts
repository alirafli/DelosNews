export type ArticleData = {
  title: string;
  byline: string;
  url: string;
  id: number;
  abstract: string;
  published_date: Date;
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
