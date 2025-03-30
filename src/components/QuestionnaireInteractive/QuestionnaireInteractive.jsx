import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form } from 'react-bootstrap';
import { ChoiceType } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { saveResponses } from '../../services/API/questionnaireServices';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage,
} from '../../services/localStorageService';

const QuestionnaireInteractive = ({ questionnaire }) => {
  const [responses, setResponses] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [completionTime, setCompletionTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const localStorageKey = `questionnaire-${questionnaire.Id}`;

  useEffect(() => {
    const savedResponses = loadFromLocalStorage(localStorageKey);
    if (savedResponses) {
      setResponses(savedResponses);
    }
    setStartTime(Date.now());
  }, [localStorageKey, questionnaire]);

  useEffect(() => {
    saveToLocalStorage(localStorageKey, responses);
  }, [localStorageKey, responses]);

  const handleInputChange = (questionId, choiceId, isChecked) => {
    setResponses(prevResponses => {
      if (
        questionnaire.Questions.find(q => q.Id === questionId)?.QuestionType ===
        ChoiceType.multiple
      ) {
        return {
          ...prevResponses,
          [questionId]: isChecked
            ? [...(prevResponses[questionId] || []), choiceId]
            : (prevResponses[questionId] || []).filter(id => id !== choiceId),
        };
      }

      if (
        questionnaire.Questions.find(q => q.Id === questionId)?.QuestionType ===
        ChoiceType.single
      ) {
        return {
          ...prevResponses,
          [questionId]: [choiceId],
        };
      }
      return {
        ...prevResponses,
        [questionId]: choiceId,
      };
    });
  };

  const handleSubmit = async () => {
    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTime) / 1000);
    setCompletionTime(timeTaken);

    const formattedResponses = questionnaire.Questions.map(question => ({
      QuestionId: question.Id,
      AnswerText:
        question.QuestionType === ChoiceType.text
          ? responses[question.Id] || null
          : null,
      ChoiceId:
        question.QuestionType !== ChoiceType.text
          ? responses[question.Id] || []
          : null,
    }));

    await saveResponses(questionnaire.Id, formattedResponses);
    setSubmitted(true);
    removeFromLocalStorage(localStorageKey);
  };

  return (
    <Container
      fluid
      className="mt-4 p-4 border border-secondary rounded bg-white"
    >
      <h3 className="text-center text-uppercase text-success">
        {questionnaire.Name}
      </h3>
      <p className="text-center text-success fs-4">
        {questionnaire.Description}
      </p>
      {!submitted ? (
        <Form>
          {questionnaire.Questions.map((question, index) => (
            <Form.Group key={question.Id} className="mb-4">
              <Form.Label>{`${index + 1}. ${
                question.QuestionText
              }`}</Form.Label>
              {question.QuestionType === ChoiceType.text && (
                <Form.Control
                  type="text"
                  value={responses[question.Id] || ''}
                  onChange={e => handleInputChange(question.Id, e.target.value)}
                />
              )}
              {(question.QuestionType === ChoiceType.single ||
                question.QuestionType === ChoiceType.multiple) && (
                <div>
                  {question.Choices.map(choice => (
                    <Form.Check
                      key={choice.Id}
                      id={`choice-${choice.Id}`}
                      type={
                        question.QuestionType === ChoiceType.single
                          ? 'radio'
                          : 'checkbox'
                      }
                      label={choice.ChoiceText}
                      checked={
                        Array.isArray(responses[question.Id])
                          ? responses[question.Id].includes(choice.Id)
                          : responses[question.Id] === choice.Id
                      }
                      onChange={e =>
                        handleInputChange(
                          question.Id,
                          choice.Id,
                          e.target.checked
                        )
                      }
                    />
                  ))}
                </div>
              )}
            </Form.Group>
          ))}
          <div className="mt-3 d-flex justify-content-center">
            <Button onClick={handleSubmit}>Finish & Save</Button>
          </div>
        </Form>
      ) : (
        <div>
          <h3>Review Your Answers</h3>
          <ul>
            {questionnaire.Questions.map((question, idx) => {
              const answer = responses[question.Id];
              const choiceTexts = Array.isArray(answer)
                ? answer.map(
                    choiceId =>
                      question.Choices.find(choice => choice.Id === choiceId)
                        ?.ChoiceText
                  )
                : question.Choices.find(choice => choice.Id === answer)
                    ?.ChoiceText;
              return (
                <li key={question.Id}>
                  <strong>{`${idx + 1}. ${question.QuestionText} `}</strong>
                  <p className="ms-3 text-danger">
                    {question.QuestionType === ChoiceType.text
                      ? answer || 'No answer'
                      : Array.isArray(choiceTexts)
                      ? choiceTexts.join(', ') || 'No answer'
                      : choiceTexts || 'No answer'}
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="fs-5">
            <strong>Completion time:</strong>
            <span className="text-danger">{` ${completionTime} seconds`}</span>
          </p>
          <Button onClick={() => navigate('/')}>Back to list</Button>
        </div>
      )}
    </Container>
  );
};

QuestionnaireInteractive.propTypes = {
  questionnaire: PropTypes.shape({
    Id: PropTypes.number.isRequired,
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Questions: PropTypes.arrayOf(
      PropTypes.shape({
        Id: PropTypes.number.isRequired,
        QuestionText: PropTypes.string.isRequired,
        QuestionType: PropTypes.oneOf([
          ChoiceType.text,
          ChoiceType.single,
          ChoiceType.multiple,
        ]).isRequired,
        Choices: PropTypes.arrayOf(
          PropTypes.shape({
            Id: PropTypes.number.isRequired,
            ChoiceText: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default QuestionnaireInteractive;
