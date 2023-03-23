import React, { FC } from "react";
import { Text } from "@components/elements";
import styles from "./SimpleCard.module.css";
import Link from "next/link";

type SimpleCardprops = {
  title: string;
  writer: string;
  background: string;
  id: number;
  link: string;
};

export const SimpleArticleCard: FC<SimpleCardprops> = ({
  title = "...",
  writer = "...",
  background,
  id,
  link,
}) => {
  return (
    <Link
      href=""
      className={`${styles.container} bg-cover`}
      style={{
        backgroundImage: `url("${background}")`,
      }}
    >
      <div className={`${styles.textWrap} truncate`}>
        <Text variant="subTitle" className="truncate">{writer}</Text>
        <Text className="truncate">{title}</Text>
      </div>
    </Link>
  );
};
