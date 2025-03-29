import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container } from 'react-bootstrap';
import CustomDropdownMenu from '../CustomDropdownMenu/CustomDropdownMenu';
import './QuestionnaireCard.scss'; 

const QuestionnaireCard = ({ item, onDelete }) => {
  return (
    <Card className="questionnaire-card bg-dark text-white" border="warning">
      <Card.Body className="p-0">
        <Card.Header className="header p-2 d-flex justify-content-between align-items-center border-warning">
          <Card.Title className="name m-0 text-info">{item.Name}</Card.Title>
          <CustomDropdownMenu quizId={item.Id} onDelete={onDelete} />
        </Card.Header>
        <Container className="content p-3">
          <Card.Text className="description">{item.Description}</Card.Text>
          <Card.Text className="text-info mb-0">
            Questions: {item.QuestionCount}
          </Card.Text>
          <Card.Text className="text-warning">
            Completed: {item.CompletionCount}
          </Card.Text>
        </Container>
      </Card.Body>
    </Card>
  );
};

QuestionnaireCard.propTypes = {
  item: PropTypes.shape({
    Id: PropTypes.number.isRequired,
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    QuestionCount: PropTypes.number.isRequired,
    CompletionCount: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default QuestionnaireCard;
