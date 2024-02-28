/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePrevClick();
          }}
          className="relative inline-flex items-center rounded-l-md px-2 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          قبلی
        </a>

        {currentPage != 1 && (
          <>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(1);
              }}
              className={`relative inline-flex items-center px-4 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300`}
            >
              1
            </a>
            <span className="px-2">...</span>
          </>
        )}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageClick(currentPage);
          }}
          className={`relative inline-flex items-center px-4 py-1 text-sm font-semibold text-white bg-gray-300`}
        >
          {currentPage}
        </a>
        {currentPage != totalPages && (
          <>
            <span className="px-2">...</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(totalPages);
              }}
              className={`relative inline-flex items-center px-4 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300`}
            >
              {totalPages}
            </a>
          </>
        )}

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNextClick();
          }}
          className="relative inline-flex items-center rounded-r-md px-2 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          بعدی
        </a>
      </nav>
    </div>
  );
};

export default Pagination;
