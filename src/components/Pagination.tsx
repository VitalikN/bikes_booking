import { FC } from "react";

import styles from "../sass/layouts/pagination.module.scss";
import { PaginationProps } from "@/utils/type";

const Pagination: FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={` ${styles.pagination__btn}  ${
            currentPage === index + 1 ? styles.active : ""
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
