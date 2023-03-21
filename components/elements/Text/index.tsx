import { CustomStyle } from "@types";
import React, { FC } from "react";
import styles from "./Text.module.css";

type TextProps = {
  children: React.ReactNode;
  variant?: "jumboTitle" | "jumboSubTitle" | "title" | "subTitle" | "error";
  className?: string;
};

const VARIANT: CustomStyle = {
  jumboTitle: styles.jumboTitle,
  jumboSubTitle: styles.jumboSubTitle,
  title: styles.title,
  subTitle: styles.subTitle,
  error: styles.error
};

export const Text: FC<TextProps> = ({
  children,
  variant = "jumboTitle",
  className,
}) => {
  return <h1 className={`${VARIANT[variant]} ${className}`}>{children}</h1>;
};
