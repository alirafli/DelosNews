import type { NextPage } from "next";
import { Button, Meta, Text, SimpleArticleCard } from "@components/elements";
import { TopFour } from "@components/modules";
import JUMBOTRON from "@assets/images/exciting-news-amico.svg";
import Image from "next/image";

const Home: NextPage = () => {
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

      <TopFour title="Most Emailed">
        <SimpleArticleCard />
        <SimpleArticleCard />
        <SimpleArticleCard />
        <SimpleArticleCard />
      </TopFour>

      <TopFour title="Most Shared">
        <SimpleArticleCard />
        <SimpleArticleCard />
        <SimpleArticleCard />
        <SimpleArticleCard />
      </TopFour>

      <TopFour title="Most Viewed">
        <SimpleArticleCard />
        <SimpleArticleCard />
        <SimpleArticleCard />
        <SimpleArticleCard />
      </TopFour>
    </div>
  );
};

export default Home;
