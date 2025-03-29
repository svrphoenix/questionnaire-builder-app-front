import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { transformQuestions } from '../helpers';
import { Container, Spinner } from 'react-bootstrap';
import QuestionnaireBuilder from '../components/QuestionnaireBuilder/QuestionnaireBuilder';
import { getQuestionnaireDetails } from '../services/API/questionnaireServices';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const EditQuestionnairePage = () => {
  const [isLoading, setLoading] = useState(false);
  const [questionnaire, setQuestionnaire] = useState(null);
  const { id: activeQuestionnaireId } = useParams();

  useEffect(() => {
    const fetchQuestionnaireDetails = async id => {
      if (!activeQuestionnaireId) {
        toast('You dont select questionary to edit. New will be created');
        return;
      }
      setLoading(true);
      const result = await getQuestionnaireDetails(id);
      setLoading(false);
      result.questions = transformQuestions(result.Questions);
      setQuestionnaire({
        id,
        name: result.Name,
        description: result.Description,
        questions: result.questions,
      });
    };
    fetchQuestionnaireDetails(activeQuestionnaireId);
  }, [activeQuestionnaireId]);

  return (
    <Container>
      <h2 className="page-header">Questionnaire Editor</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <QuestionnaireBuilder questionnaire={questionnaire} />
      )}
    </Container>
  );
};

EditQuestionnairePage.propTypes = {};

export default EditQuestionnairePage;
