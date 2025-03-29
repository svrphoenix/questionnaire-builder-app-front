import React from 'react';
import PropTypes from 'prop-types';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Navigation.scss';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="primary" className="px-2 pb-0" sticky="top">
      <Nav
        justify
        variant="tabs"
        defaultActiveKey="/"
        onSelect={eventKey => navigate(eventKey)}
      >
        <Nav.Link className="text-white" eventKey="/">
          View
        </Nav.Link>
        <Nav.Link eventKey="/builder">Create</Nav.Link>
        <Nav.Link eventKey="/interactive">Run</Nav.Link>
      </Nav>
    </Navbar>
  );
};

Navigation.propTypes = {};

export default Navigation;
