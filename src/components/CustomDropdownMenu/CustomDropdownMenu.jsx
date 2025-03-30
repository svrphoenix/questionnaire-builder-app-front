import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import ConfirmNotification from '../ConfirmNotification/ConfirmNotification';

const CustomDropdownMenu = ({ quizId, onDelete }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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
        <Dropdown.Item eventKey={`/interactive/${quizId}`}>
          Run questionnaire
        </Dropdown.Item>
        <Dropdown.Item eventKey="#" onClick={() => setShowModal(true)}>
          Delete questionnaire
        </Dropdown.Item>
        <ConfirmNotification
          show={showModal}
          handleAction={() => onDelete(quizId)}
          handleClose={() => setShowModal(false)}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

CustomDropdownMenu.propTypes = {
  quizId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CustomDropdownMenu;
