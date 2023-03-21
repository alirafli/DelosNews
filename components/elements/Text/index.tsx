import { CustomStyle } from "@types";
import React, { FC } from "react";
import styles from "./Text.module.css";

type TextProps = {
  children: React.ReactNode;
  variant?: "jumboTitle" | "jumboSubTitle" | "title" | "subTitle";
};

const VARIANT: CustomStyle = {
  jumboTitle: styles.jumboTitle,
  jumboSubTitle: styles.jumboSubTitle,
  title: styles.title,
  subTitle: styles.subTitle,
};

export const Text: FC<TextProps> = ({ children, variant = "jumboTitle" }) => {
  return <h1 className={`${VARIANT[variant]}`}>{children}</h1>;
};
