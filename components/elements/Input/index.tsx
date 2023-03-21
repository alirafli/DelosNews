import React, { FC } from "react";
import { Text } from "@components/elements";
import styles from "./Input.module.css";

type InputProps = {
  name: string;
  label: string;
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  placeholder?: string;
  error: JSX.Element;
};

export const Input: FC<InputProps> = ({
  name,
  type = "text",
  onChange,
  label,
  value,
  placeholder = "click here...",
  error,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor="text">
        <Text variant="subTitle">{label}</Text>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete="off"
        placeholder={placeholder}
        className={styles.input}
      />
      <Text variant="error">{error}</Text>
    </div>
  );
};
