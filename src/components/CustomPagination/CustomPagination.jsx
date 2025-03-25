import React, { useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const CustomPagination = ({
  pagesCount,
  currentPage,
  setCurrentPage,
  alwaysShown = true,
}) => {
  const isPaginationShown = alwaysShown ? true : pagesCount > 1;
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pagesCount;

  const onSelectPage = number => {
    if (currentPage === number) return;
    setCurrentPage(number);
  };

  const onPreviousPageClick = () => {
    if (currentPage > 1) {
      onSelectPage(currentPage - 1);
    }
  };

  const onNextPageClick = () => {
    if (currentPage < pagesCount) {
      onSelectPage(currentPage + 1);
    }
  };

  let isPageNumberOutOfRange = false;

  const pageNumbers = [...Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers =
      Math.abs(pageNumber - currentPage) <= 2;

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;
      return (
        <Pagination.Item
          key={pageNumber}
          onClick={() => onSelectPage(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </Pagination.Item>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      return <Pagination.Ellipsis key={pageNumber} disabled />;
    }

    return null;
  });

  useEffect(() => {
    if (currentPage > pagesCount) {
      pagesCount && setCurrentPage(pagesCount);
    }
  }, [currentPage, pagesCount, setCurrentPage]);

  return (
    <>
      {isPaginationShown && (
        <Pagination>
          <Pagination.First
            className={isCurrentPageFirst ? 'disabled' : ''}
            onClick={() => onSelectPage(1)}
            disabled={isCurrentPageFirst}
          />
          <Pagination.Prev
            className={isCurrentPageFirst ? 'disabled' : ''}
            onClick={onPreviousPageClick}
            disabled={isCurrentPageFirst}
          />
          {pageNumbers}
          <Pagination.Next
            onClick={onNextPageClick}
            disabled={isCurrentPageLast}
            className={isCurrentPageLast ? 'disabled' : ''}
          />
          <Pagination.Last
            disabled={isCurrentPageLast}
            className={isCurrentPageLast ? 'disabled' : ''}
            onClick={() => onSelectPage(pagesCount)}
          />
        </Pagination>
      )}
    </>
  );
};

export default CustomPagination;
