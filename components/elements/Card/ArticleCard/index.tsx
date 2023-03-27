import React, { FC } from "react";
import { Text } from "@components/elements";
import styles from "./ArticleCard.module.css";
import Link from "next/link";
import { readableDate } from "@utils";

type ArticleProps = {
  title: string;
  writer: string;
  background: string;
  id: string;
  uri: string;
  sectionName: string;
  typeOfMaterial: string;
  pubDate: string;
};

export const ArticleCard: FC<ArticleProps> = ({
  title = "...",
  writer = "...",
  background = "",
  id,
  uri,
  sectionName,
  typeOfMaterial,
  pubDate,
}) => {
  return (
    <Link
      href={`article/${id}?uri=${uri}`}
      className={`${styles.container} bg-cover ${
        !background && "bg-default-card"
      }`}
      style={{
        backgroundImage: `${background && `url("${background}")`}`,
      }}
    >
      <div className={`${styles.textWrap} truncate`}>
        <Text variant="subTitle" className="truncate">
          {writer}
        </Text>
        <Text className="truncate">{title}</Text>

        <div>
          <Text variant="p">{readableDate(pubDate)}</Text>
          <div className="flex gap-x-3">
            <Text variant="p">{sectionName}</Text>
            <Text variant="p">{typeOfMaterial}</Text>
          </div>
        </div>
      </div>
    </Link>
  );
};
