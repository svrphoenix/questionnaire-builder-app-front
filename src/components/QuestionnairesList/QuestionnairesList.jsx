import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import CustomDropdownMenu from '../CustomDropdownMenu/CustomDropdownMenu';
import { useNavigate } from 'react-router-dom';

const QuestionnairesList = ({ questionnaires }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="d-flex justify-content-end">
        <Button className="rounded-circle" onClick={() => navigate('/builder')}>
          +
        </Button>
      </div>
      <Row
        xs={1}
        sm={2}
        md={3}
        lg={4}
        className="my-2 g-4 p-0 justify-content-center align-items-start"
        as="ul"
      >
        {questionnaires.map(item => (
          <Col key={item.Id} as="li">
            <Card className="bg-dark text-white" border="warning">
              <Card.Body className="p-0">
                <Card.Header className="p-2 d-flex justify-content-between  align-items-center border-warning">
                  <Card.Title className="m-0 text-info">{item.Name}</Card.Title>
                  <CustomDropdownMenu quizId={item.Id} />
                </Card.Header>
                <Container className="p-3">
                  <Card.Text>{item.Description}</Card.Text>
                  <Card.Text className="text-info mb-0">
                    Questions: {item.QuestionCount}
                  </Card.Text>
                  <Card.Text className="text-warning">
                    Comleted: {item.CompletionCount}
                  </Card.Text>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

QuestionnairesList.propTypes = {};

export default QuestionnairesList;
