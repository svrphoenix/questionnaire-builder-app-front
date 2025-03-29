import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar } from 'react-bootstrap';
import './Navigation.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Navbar bg="primary" className="px-2 pb-0" sticky="top">
      <Nav justify variant="tabs" onSelect={eventKey => navigate(eventKey)}>
        <Nav.Link className="text-white" eventKey="/" active={pathname === '/'}>
          View
        </Nav.Link>
        <Nav.Link eventKey="/builder" active={pathname === '/builder'}>
          Create
        </Nav.Link>
        <Nav.Link
          disabled={pathname.includes('interactive') ? false : true}
          active={pathname.includes('interactive')}
        >
          Run
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

Navigation.propTypes = {};

export default Navigation;
