import { Button } from "@components/elements";
import React, { FC } from "react";
import styles from "./Pagination.module.css";

type PaginationProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: any;
  page: number;
};
const pageRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Pagination: FC<PaginationProps> = ({
  setPage,
  onSubmit,
  page,
}) => {
  const scrollToTop = () => {
    window.scrollTo(200, 200);
  };

  return (
    <div className={styles.container}>
      {pageRange.map((data, key) => {
        return (
          <Button
            key={key}
            onClick={(e) => {
              setPage(data);
              scrollToTop();
              onSubmit(e);
            }}
            variant={page === data ? "secondary" : "primary"}
          >
            {data}
          </Button>
        );
      })}
    </div>
  );
};
