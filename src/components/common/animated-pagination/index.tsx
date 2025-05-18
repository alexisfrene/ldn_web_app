import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@ui/pagination";

type Props = {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
  onClickPrevious?: () => void;
  onClickNext?: () => void;
};
export const AnimatedPagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  setPage,
  onClickPrevious,
  onClickNext,
}) => {
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 100);
    return () => clearTimeout(timeout);
  }, [currentPage]);

  const visiblePages = Array.from(
    { length: totalPages },
    (_, i) => i + 1,
  ).filter((page) => {
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 3);
    return page >= start && page <= end;
  });

  return (
    <Pagination>
      <PaginationContent
        className={clsx(
          "transition-opacity duration-300",
          fade ? "opacity-100" : "opacity-0",
        )}
      >
        <PaginationItem>
          <PaginationPrevious onClick={onClickPrevious} />
        </PaginationItem>
        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => setPage(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={onClickNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
