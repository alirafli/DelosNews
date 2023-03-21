import { FC } from "react";
import { CustomStyle } from "@types";
import styles from "./Button.module.css";

type BtnProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  className?: string;
};

const VARIANT: CustomStyle = {
  primary: styles.primary,
  secondary: styles.secondary,
};

export const Button: FC<BtnProps> = ({
  children = "click here",
  variant = "primary",
  fullWidth = false,
  className = "",
}) => {
  return (
    <button
      className={`${styles.btnContainer} ${VARIANT[variant]} ${
        fullWidth ? "w-full" : "w-fit"
      } ${className}`}
    >
      <p>{children}</p>
    </button>
  );
};
