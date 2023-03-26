import React, { FC } from "react";
import { Button } from "../Button";

type SearchBarProps = {
  name: string;
  value: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: any;
};

export const SearchBar: FC<SearchBarProps> = ({
  name,
  onChange,
  value,
  placeholder = "click here...",
  onSubmit,
}) => {
  return (
    <form className="">
      <input
        className="p-2 rounded-xl bg-white text-base text-black"
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        autoComplete="off"
        placeholder={placeholder}
      />
      <Button type="submit" onClick={onSubmit}>
        Search
      </Button>
    </form>
  );
};
