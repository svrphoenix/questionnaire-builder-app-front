import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

const ConfirmNotification = ({ show, handleClose, handleAction }) => {
  const handleConfirmedAction = async () => {
    await handleAction();
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            Confirm questionnare deleting
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmedAction}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ConfirmNotification.propTypes = {};

export default ConfirmNotification;
