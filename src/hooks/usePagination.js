import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

const usePagination = (initialPage = 1) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();
  const [currentPage, setCurrentPage] = useState(
    () => parseInt(searchParams.get('page')) || initialPage
  );

  useEffect(() => {
    const params = new URLSearchParams(search);
    setCurrentPage(parseInt(params.get('page')) || initialPage);
  }, [search, initialPage]);

  useEffect(() => {
    searchParams.set('page', currentPage);
    setSearchParams(searchParams);
  }, [currentPage, searchParams, setSearchParams]);

  return [currentPage, setCurrentPage];
};

export default usePagination;
