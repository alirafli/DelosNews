import React from "react";
import { Text } from "@components/elements";
import styles from "./SimpleCard.module.css";
import Link from "next/link";

export const SimpleArticleCard = () => {
  return (
    <Link href="" className={`${styles.container} bg-default-card bg-cover`}>
      <div className={styles.textWrap}>
        <Text variant="subTitle">Author</Text>
        <Text>title</Text>
      </div>
    </Link>
  );
};
