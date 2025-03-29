import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const CustomDropdownMenu = ({ quizId }) => {
  const navigate = useNavigate();

  return (
    <Dropdown onSelect={eventKey => navigate(eventKey)}>
      <Dropdown.Toggle
        variant="primary"
        id="dropdown"
        className="rounded-circle"
      ></Dropdown.Toggle>
      <Dropdown.Menu variant="dark">
        <Dropdown.Item eventKey={`/editor/${quizId}`}>
          Edit questionnaire
        </Dropdown.Item>
        <Dropdown.Item eventKey="/interactive">Run questionnaire</Dropdown.Item>
        <Dropdown.Item href="#delete">Delete questionnaire</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

CustomDropdownMenu.propTypes = {
  quizId: PropTypes.string,
};

export default CustomDropdownMenu;
