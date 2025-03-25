import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Spinner } from 'react-bootstrap';
import QuestionnairesList from '../components/QuestionnairesList/QuestionnairesList';
import { getAllQuestionnaires } from '../services/API/questionnaireServices';
import usePagination from '../hooks/usePagination';
import CustomPagination from '../components/CustomPagination/CustomPagination';

const QuestionnairesListPage = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = usePagination();

  useEffect(() => {
    const fetchQuestionnaires = async activePage => {
      setLoading(true);
      const result = await getAllQuestionnaires(activePage);
      setLoading(false);
      setQuestionnaires(result.questionnaires.Data);
      setTotalPages(result.questionnaires.CountPages);
    };
    fetchQuestionnaires(currentPage);
  }, [currentPage]);

  return (
    <Container>
      <h2 className="text-primary">Questionnaires List</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <QuestionnairesList questionnaires={questionnaires} />
          <div className="d-flex justify-content-center">
            <CustomPagination
              pagesCount={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              alwaysShown={false}
            />
          </div>
        </>
      )}
    </Container>
  );
};

QuestionnairesListPage.propTypes = {};

export default QuestionnairesListPage;
