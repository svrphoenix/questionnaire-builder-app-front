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
        <Button onClick={() => navigate('/builder')}>+</Button>
      </div>
      <Row xs={1} className="mt-1 g-4 justify-content-center" as="ul">
        {questionnaires.map(item => (
          <Col key={item.Id} style={{ width: '18rem' }} as="li">
            <Card>
              <Card.Body>
                <Card.Header className="d-flex justify-content-between">
                  <Card.Title>{item.Name}</Card.Title>
                  <CustomDropdownMenu />
                </Card.Header>
                <Card.Text>{item.Description}</Card.Text>
                <Card.Text className="text-success mb-0">
                  Questions: {item.QuestionCount}
                </Card.Text>
                <Card.Text className="text-warning">
                  Comleted: {item.CompletionCount}
                </Card.Text>
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
