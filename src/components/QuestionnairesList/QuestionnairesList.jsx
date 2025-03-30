import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import QuestionnaireCard from '../QuestionnaireCard/QuestionnaireCard';

const QuestionnairesList = ({ questionnaires, onDelete }) => {
  const navigate = useNavigate();

  const [sortCriterion, setSortCriterion] = useState('name');

  const sortedQuestionnaires = [...questionnaires].sort((a, b) => {
    switch (sortCriterion) {
      case 'name':
        return a.Name.localeCompare(b.Name);
      case 'questions':
        return b.QuestionCount - a.QuestionCount;
      case 'completions':
        return b.CompletionCount - a.CompletionCount;
      default:
        return 0;
    }
  });

  const renderTooltip = props => (
    <Tooltip {...props}>Add questionnaire</Tooltip>
  );

  return (
    <Container
      fluid
      className="mt-4 p-4 border border-secondary rounded bg-white"
    >
      <div className="d-flex justify-content-between align-items-center">
        <DropdownButton
          id="sort-dropdown"
          title={`Sort by: ${sortCriterion}`}
          onSelect={value => setSortCriterion(value)}
          variant="light"
          className="mb-3"
        >
          <Dropdown.Item eventKey="name">Name</Dropdown.Item>
          <Dropdown.Item eventKey="questions">
            Number of Questions
          </Dropdown.Item>
          <Dropdown.Item eventKey="completions">
            Number of Completions
          </Dropdown.Item>
        </DropdownButton>
        <OverlayTrigger placement="bottom" overlay={renderTooltip}>
          <Button
            variant="secondary"
            className="rounded-circle"
            onClick={() => navigate('/builder')}
          >
            +
          </Button>
        </OverlayTrigger>
      </div>
      {!questionnaires.length && (
        <Alert className="mt-2 text-center">You have no questionnaires</Alert>
      )}
      <Row
        xs={1}
        sm={2}
        md={3}
        lg={4}
        className="my-2 g-4 p-0 justify-content-center align-items-start"
        as="ul"
      >
        {sortedQuestionnaires.map(item => (
          <Col key={item.Id} as="li">
            <QuestionnaireCard item={item} onDelete={onDelete} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

QuestionnairesList.propTypes = {
  questionnaires: PropTypes.arrayOf(
    PropTypes.shape({
      Id: PropTypes.number.isRequired,
      Name: PropTypes.string.isRequired,
      QuestionCount: PropTypes.number.isRequired,
      CompletionCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default QuestionnairesList;
