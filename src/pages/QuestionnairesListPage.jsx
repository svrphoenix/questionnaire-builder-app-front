import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Spinner } from 'react-bootstrap';
import QuestionnairesList from '../components/QuestionnairesList/QuestionnairesList';
import {
  deleteQuestionnaire,
  getAllQuestionnaires,
} from '../services/API/questionnaireServices';
import usePagination from '../hooks/usePagination';
import CustomPagination from '../components/CustomPagination/CustomPagination';

const QuestionnairesListPage = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = usePagination();

  const fetchQuestionnaires = async activePage => {
    setLoading(true);
    const result = await getAllQuestionnaires(activePage);
    setLoading(false);
    setQuestionnaires(result.questionnaires.Data);
    setTotalPages(result.questionnaires.CountPages);
  };

  const removeQuestionnaire = async id => {
    setLoading(true);
    await deleteQuestionnaire(id);
    setLoading(false);
    if (questionnaires.length - 1 === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
      await fetchQuestionnaires(currentPage - 1);
    } else {
      await fetchQuestionnaires(currentPage);
    }
  };

  useEffect(() => {
    fetchQuestionnaires(currentPage);
  }, [currentPage]);

  return (
    <Container>
      <h2 className="page-header">Questionnaires List</h2>
      {isLoading ? (
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
          <div className="mt-2 d-flex justify-content-center">
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
