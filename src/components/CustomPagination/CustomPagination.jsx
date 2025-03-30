import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
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
          {[...Array(pagesCount)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              onClick={() => onSelectPage(index + 1)}
              active={index + 1 === currentPage}
            >
              {index + 1}
            </Pagination.Item>
          ))}
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

CustomPagination.propTypes = {
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  alwaysShown: PropTypes.bool,
};

export default CustomPagination;
