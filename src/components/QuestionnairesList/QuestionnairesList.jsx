import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import CustomDropdownMenu from '../CustomDropdownMenu/CustomDropdownMenu';
// import { useNavigate } from 'react-router-dom';

const QuestionnairesList = ({ questionnaires }) => {
  // const navigate = useNavigate();

  return (
    <div>
      <Row xs={1} md={2} className="g-4" as="ul">
        {questionnaires.map(item => (
          <Col key={item.Id} style={{ width: '18rem' }} as="li">
            <Card>
              <Card.Body>
                <Card.Header className="d-flex justify-content-between">
                  <Card.Title>{item.Name}</Card.Title>
                  <CustomDropdownMenu />
                  {/* <Dropdown onSelect={eventKey => navigate(eventKey)}>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                    ></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="/editor">
                        Edit questionnaire
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="/interactive">
                        Run questionnaire
                      </Dropdown.Item>
                      <Dropdown.Item href="#delete">
                        Delete questionnaire
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                </Card.Header>
                <Card.Text>{item.Description}</Card.Text>
                <Card.Text>Questions: {item.QuestionCount}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

QuestionnairesList.propTypes = {};

export default QuestionnairesList;
