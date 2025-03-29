import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { ChoiceType } from '../../constants';
import {
  saveQuestionnaire,
  updateQuestionnaire,
} from '../../services/API/questionnaireServices';
import { useNavigate } from 'react-router-dom';

const QuestionnaireBuilder = ({ questionnaire }) => {
  const navigate = useNavigate();
  const initialQuestion = {
    id: Date.now(),
    text: '',
    type: ChoiceType.text,
    choices: null,
  };

  const [questions, setQuestions] = useState(
    questionnaire ? questionnaire.questions : [initialQuestion]
  );
  const [questionnaireName, setQuestionnaireName] = useState(
    questionnaire ? questionnaire.name : ''
  );
  const [questionnaireDescription, setQuestionnaireDescription] = useState(
    questionnaire ? questionnaire.description : ''
  );

  const addQuestion = () => {
    setQuestions([...questions, initialQuestion]);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];

    if (field === 'type') {
      if (value === ChoiceType.single || value === ChoiceType.multiple) {
        updatedQuestions[index].choices = updatedQuestions[index].choices || [
          '',
          '',
        ];
      } else {
        updatedQuestions[index].choices = null;
      }
    }
    updatedQuestions[index][field] = value;

    setQuestions(updatedQuestions);
  };

  const deleteQuestion = index => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const addChoice = index => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].choices.push('');
    setQuestions(updatedQuestions);
  };

  const updateChoice = (questionIndex, choiceIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].choices[choiceIndex] = value;
    setQuestions(updatedQuestions);
  };

  const deleteChoice = (questionIndex, choiceIndex) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].choices.length > 2) {
      updatedQuestions[questionIndex].choices.splice(choiceIndex, 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const savingQuestionnaire = {
      Name: questionnaireName,
      Description: questionnaireDescription,
      Questions: questions.map(item => ({
        QuestionText: item.text,
        QuestionType: item.type,
        Choices: item.choices,
      })),
    };
    if (questionnaire?.id) {
      await updateQuestionnaire(questionnaire.id, savingQuestionnaire);
    }
    await saveQuestionnaire(savingQuestionnaire);
    navigate('/');
  };

  return (
    <Container
      fluid
      className="mt-4 p-4 border border-secondary rounded bg-white"
    >
      <Form onSubmit={handleSubmit}>
        <Container className="mb-4">
          <Form.Text as="h3">Questionnary Name</Form.Text>
          <Form.Control
            id="QuestionnaireName"
            type="text"
            className="mb-4 shadow"
            value={questionnaireName}
            onChange={e => setQuestionnaireName(e.target.value)}
          />
          <Form.Text as="h3">Questionnary Description</Form.Text>
          <Form.Control
            id="QuestionnaireDescription"
            type="text"
            className="shadow"
            value={questionnaireDescription}
            onChange={e => setQuestionnaireDescription(e.target.value)}
          />
        </Container>
        {questions.map((question, index) => (
          <Form.Group
            className="mb-3 p-3 border  border-1 rounded shadow"
            key={question.id}
          >
            <Form.Text as="h3">Question</Form.Text>
            <Row>
              <Col md="auto" className="d-flex align-items-center">
                <Form.Label htmlFor={question.id} className="mb-0">
                  {`${index + 1}.`}
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  id={question.id}
                  type="text"
                  value={question.text}
                  onChange={e => updateQuestion(index, 'text', e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Form.Select
                  value={question.type}
                  onChange={e => updateQuestion(index, 'type', e.target.value)}
                >
                  <option value={ChoiceType.text}>Text</option>
                  <option value={ChoiceType.single}>Single Choice</option>
                  <option value={ChoiceType.multiple}>Multiple Choices</option>
                </Form.Select>
              </Col>
              <Col md="auto" className="d-flex align-items-center">
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => deleteQuestion(index)}
                  disabled={questions.length === 1}
                >
                  Remove
                </Button>
              </Col>
            </Row>
            {(question.type === ChoiceType.single ||
              question.type === ChoiceType.multiple) && (
              <Form.Group className="mt-3">
                <Form.Text as="h3">Answers:</Form.Text>
                {question.choices.map((choice, choiceIndex) => (
                  <Row key={`${question.id}-choice-${choiceIndex}`}>
                    <Col md="auto" className="ms-3 d-flex align-items-center">
                      <Form.Label
                        htmlFor={`${question.id}-choice-${choiceIndex}`}
                        className="mb-0"
                      >
                        {`${choiceIndex + 1}.`}
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        id={`${question.id}-choice-${choiceIndex}`}
                        key={choiceIndex}
                        type="text"
                        value={choice}
                        onChange={e =>
                          updateChoice(index, choiceIndex, e.target.value)
                        }
                        className="mb-2"
                      />
                    </Col>
                    <Col md="auto" className="d-flex align-items-baseline">
                      <Button
                        size="sm"
                        variant="danger"
                        disabled={question.choices.length === 2}
                        onClick={() => deleteChoice(index, choiceIndex)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                ))}
                <div className="d-flex justify-content-start mt-2">
                  <Button type="button" onClick={() => addChoice(index)}>
                    Add Answer
                  </Button>
                </div>
              </Form.Group>
            )}
          </Form.Group>
        ))}
        <Button className="mt-3" onClick={addQuestion}>
          Add Question
        </Button>
        <div className="mt-3 d-flex justify-content-center">
          <Button variant="success" type="submit" disabled={!questions[0].text}>
            Save Questionaire
          </Button>
        </div>
      </Form>
    </Container>
  );
};

QuestionnaireBuilder.propTypes = {
  questionnaire: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    questions: PropTypes.array,
  }),
};

export default QuestionnaireBuilder;
