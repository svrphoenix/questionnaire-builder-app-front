import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import QuestionnaireCard from '../QuestionnaireCard/QuestionnaireCard';

const QuestionnairesList = ({ questionnaires, onDelete }) => {
  const navigate = useNavigate();

  const renderTooltip = props => (
    <Tooltip {...props}>Add questionnaire</Tooltip>
  );

  return (
    <Container
      fluid
      className="mt-4 p-4 border border-secondary rounded bg-white"
    >
      <div className="d-flex justify-content-end">
        <OverlayTrigger placement="bottom" overlay={renderTooltip}>
          <Button
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
        {questionnaires.map(item => (
          <Col key={item.Id} as="li">
            <QuestionnaireCard item={item} onDelete={onDelete} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

QuestionnairesList.propTypes = {};

export default QuestionnairesList;
