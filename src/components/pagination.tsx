import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { Button } from "./ui/button";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: IPaginationProps) => {
  const [, setSearchParams] = useSearchParams();

  const firstPage = () => {
    setSearchParams((params) => {
      params.set("page", "1");
      return params;
    });
  };

  const prevPage = () => {
    if (currentPage - 1 <= 0) return;
    setSearchParams((params) => {
      params.set("page", String(currentPage - 1));
      return params;
    });
  };

  const nextPage = () => {
    if (currentPage + 1 > totalPages) return;

    setSearchParams((params) => {
      params.set("page", String(currentPage + 1));
      return params;
    });
  };

  const lastPage = () => {
    setSearchParams((params) => {
      params.set("page", String(totalPages));
      return params;
    });
  };

  const setPage = (page: number) => {
    setSearchParams((params) => {
      params.set("page", String(page));
      return params;
    });
  };

  const nextperPage = currentPage < totalPages ? currentPage + 1 : totalPages;
  const prevPerPage = currentPage > 1 ? currentPage - 1 : 1;

  return (
    <div className="flex items-center justify-between space-x-2 py-4 gap-3 flex-wrap w-full ">
      <div className="text-sm text-muted-foreground pl-4 flex justify-center w-full  sm:w-auto ">
        Página {currentPage} de {totalPages}
      </div>
      <PaginationContent className="flex justify-center w-full  sm:w-auto">
        <Button
          disabled={currentPage == 1}
          className="bg-gray-100 text-black hover:text-primary-foreground text-xs h-5 md:h-6 w-6 md:w-6"
          title="Firtpage"
          aria-label="Click to first page"
          size="icon"
          onClick={firstPage}
        >
          <ChevronsLeft />
        </Button>
        <PaginationItem>
          <PaginationPrevious
            isActive={currentPage !== 1}
            className={`${
              currentPage == 1 ? "" : "cursor-pointer"
            } text-xs sm:text-sm`}
            aria-label="Previous page"
            onClick={prevPage}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className={`${currentPage == 1 ? "hidden" : ""} text-`}
            aria-label="Previous page"
            onClick={() => setPage(prevPerPage)}
          >
            {currentPage == 1 ? null : prevPerPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            aria-label="Next page"
            className={`${currentPage == totalPages ? "hidden" : ""} `}
            onClick={() => setPage(nextperPage)}
          >
            {nextperPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden sm:block ">
          {currentPage !== totalPages && <PaginationEllipsis />}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext className="text-xs sm:text-sm" onClick={nextPage} />
        </PaginationItem>
        <Button
          disabled={currentPage == totalPages}
          className={`bg-gray-100 text-black hover:text-primary-foreground text-xs h-5 md:h-6 w-6 md:w-6 ${
            currentPage == totalPages ? "" : "cursor-pointer"
          }`}
          size="icon"
          title="last page "
          aria-label="click to last page"
          onClick={lastPage}
        >
          <ChevronsRight />
        </Button>
      </PaginationContent>
    </div>
  );
};
