import React from 'react';
import PropTypes from 'prop-types';
import QuestionnaireBuilder from '../components/QuestionnaireBuilder/QuestionnaireBuilder';
import { Container } from 'react-bootstrap';

const CreateQuestionnairePage = () => {
  return (
    <Container>
      <h2 className="text-primary">Questionnaire Builder</h2>
      <QuestionnaireBuilder />
    </Container>
  );
};

CreateQuestionnairePage.propTypes = {};

export default CreateQuestionnairePage;
