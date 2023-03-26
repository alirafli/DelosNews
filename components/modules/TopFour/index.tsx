import { Text } from "@components/elements";
import Link from "next/link";
import React, { FC } from "react";
import styles from "./TopFour.module.css";

type TopFourProps = {
  title: string;
  children: React.ReactNode;
};

export const TopFour: FC<TopFourProps> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.textWrapper}>
        <Text>{title}</Text>
        <Link href={`/article?q=${title}`}>
          <Text variant="subTitle">See More</Text>
        </Link>
      </div>

      <div className={styles.children}>{children}</div>
    </div>
  );
};
