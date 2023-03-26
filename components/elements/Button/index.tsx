import { FC } from "react";
import { CustomStyle, BtnLinkProps, BtnProps } from "@types";
import Link from "next/link";
import styles from "./Button.module.css";
import { Text } from "@components/elements";
import SPIN from "@assets/icons/half-circle.png";
import Image from "next/image";

const VARIANT: CustomStyle = {
  primary: styles.primary,
  secondary: styles.secondary,
};

export const Button: FC<BtnProps> = ({
  children = "click here",
  variant = "primary",
  fullWidth = false,
  className = "",
  type = "button",
  onClick,
  isLoading = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${styles.btnContainer} ${VARIANT[variant]} ${
        fullWidth ? "w-full" : "w-fit"
      } ${className}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <Image
          src={SPIN}
          alt="loading..."
          width={20}
          height={20}
          className="animate-spin"
        />
      ) : (
        <Text variant="subTitle">{children}</Text>
      )}
    </button>
  );
};

export const ButtonLink: FC<BtnLinkProps> = ({
  children = "click here",
  variant = "primary",
  fullWidth = false,
  className = "",
  linkTo = "/",
  onClick,
}) => {
  return (
    <Link
      href={linkTo}
      className={`${styles.btnContainer} ${VARIANT[variant]} ${
        fullWidth ? "w-full" : "w-fit"
      } ${className}`}
      onClick={onClick}
    >
      <Text variant="subTitle">{children}</Text>
    </Link>
  );
};
