import React, { useEffect, useState, useCallback } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import QuestionnairesList from '../components/QuestionnairesList/QuestionnairesList';
import {
  deleteQuestionnaire,
  getAllQuestionnaires,
} from '../services/API/questionnaireServices';
import CustomPagination from '../components/CustomPagination/CustomPagination';
import usePagination from '../hooks/usePagination';

const QuestionnairesListPage = () => {
  const [currentPage, setCurrentPage] = usePagination();
  const [questionnaires, setQuestionnaires] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const [isFetchingMore, setFetchingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchQuestionnaires = async (page, append = false) => {
    if (!append) setLoading(true);
    setFetchingMore(append);

    const result = await getAllQuestionnaires(page);

    if (append) {
      setQuestionnaires(prev => [...prev, ...result.questionnaires.Data]);
    } else {
      setQuestionnaires(result.questionnaires.Data);
    }

    setTotalPages(result.questionnaires.CountPages);
    setHasMoreData(page < result.questionnaires.CountPages);
    setLoading(false);
    setFetchingMore(false);
  };

  const handleScroll = useCallback(() => {
    if (!hasMoreData || isFetchingMore) return;

    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      setFetchingMore(true);
      setCurrentPage(prevPage => {
        const nextPage = prevPage + 1;
        if (nextPage <= totalPages) {
          fetchQuestionnaires(nextPage, true);
        }
        return nextPage;
      });
    }
  }, [hasMoreData, isFetchingMore, totalPages, setCurrentPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    fetchQuestionnaires(currentPage);
  }, [currentPage]);

  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
  }, []); // Empty dependency array ensures it runs only on page load

  const removeQuestionnaire = async id => {
    setLoading(true);
    await deleteQuestionnaire(id);
    setLoading(false);

    const updatedQuestionnaires = questionnaires.filter(q => q.Id !== id);
    setQuestionnaires(updatedQuestionnaires);

    if (updatedQuestionnaires.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchQuestionnaires(currentPage - 1);
    } else {
      fetchQuestionnaires(currentPage);
    }
  };

  return (
    <Container>
      <h2 className="page-header">Questionnaires List</h2>
      {isLoading && currentPage === 1 ? (
        <Container
          fluid
          className="vh-100 d-flex justify-content-center align-items-center"
        >
          <Spinner />
        </Container>
      ) : (
        <>
          <QuestionnairesList
            questionnaires={questionnaires}
            onDelete={removeQuestionnaire}
          />
          {isFetchingMore && (
            <div className="d-flex justify-content-center mt-3">
              <Spinner animation="border" />
            </div>
          )}
          <div className="mt-2 d-flex justify-content-center">
            <CustomPagination
              pagesCount={totalPages}
              currentPage={currentPage}
              setCurrentPage={page => {
                setCurrentPage(page);
                setQuestionnaires([]);
                fetchQuestionnaires(page);
              }}
              alwaysShown={true}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default QuestionnairesListPage;
