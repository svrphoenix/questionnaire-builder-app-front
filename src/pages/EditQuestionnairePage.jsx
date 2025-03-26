import React from 'react';
import PropTypes from 'prop-types';
import { transformQuestions } from '../helpers';
import { Container } from 'react-bootstrap';
import QuestionnaireBuilder from '../components/QuestionnaireBuilder/QuestionnaireBuilder';

const EditQuestionnairePage = () => {
  const mockValues = {};
  mockValues.questions = transformQuestions([
    {
      QuestionText: 'What is your favorite car?',
      QuestionType: 'single_choice',
      Choices: [
        { ChoiceText: 'Toyota' },
        { ChoiceText: 'Honda' },
        { ChoiceText: 'BMW' },
        { ChoiceText: 'Ford' },
      ],
    },
    {
      QuestionText: 'Describe the best car.',
      QuestionType: 'text',
      Choices: [],
    },
    {
      QuestionText: 'What important for you?',
      QuestionType: 'multiple_choices',
      Choices: [
        { ChoiceText: 'Engine' },
        { ChoiceText: 'Class' },
        { ChoiceText: 'Color' },
      ],
    },
  ]);

  return (
    <Container>
      <h2 className="text-primary">Questionnaire Editor</h2>
      <QuestionnaireBuilder questionnaire={mockValues} />
    </Container>
  );
};

EditQuestionnairePage.propTypes = {};

export default EditQuestionnairePage;
