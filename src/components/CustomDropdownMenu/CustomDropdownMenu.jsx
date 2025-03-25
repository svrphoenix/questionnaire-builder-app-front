import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const CustomDropdownMenu = () => {
  const navigate = useNavigate();

  return (
    <Dropdown onSelect={eventKey => navigate(eventKey)}>
      <Dropdown.Toggle variant="success" id="dropdown-basic"></Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="/editor">Edit questionnaire</Dropdown.Item>
        <Dropdown.Item eventKey="/interactive">Run questionnaire</Dropdown.Item>
        <Dropdown.Item href="#delete">Delete questionnaire</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

CustomDropdownMenu.propTypes = {};

export default CustomDropdownMenu;
