import React, { useContext } from 'react';

import { UserContext } from '../../Contexts/User';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import HeaderLink from './HeaderLink';

const Header: React.FC = () => {
  const { user, isLoggingIn } = useContext(UserContext);
  const showFAQ = Boolean(!isLoggingIn && user.uid);

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container fluid className="my-auto">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <HeaderLink to="/events/">Events</HeaderLink>
            <HeaderLink to="/feedback">Feedback</HeaderLink>
            {showFAQ && <HeaderLink to="/faq">FAQ</HeaderLink>}
          </Nav>
          <Nav>
            {isLoggingIn ? (
              <div />
            ) : user.uid ? (
              <HeaderLink to="/profile/">Profile</HeaderLink>
            ) : (
              <HeaderLink to="/login/">Log In</HeaderLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
