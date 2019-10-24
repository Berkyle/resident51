import React from "react";

import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";

const Footer = () => {

  return (
    <footer className="mt-5 py-2 px-md-4" id="page_footer">
      <Container fluid={true}>
        <Row>
          <Col xs="auto">
            <Link className="footer-link" to='/privacy-policy'>Privacy</Link>
          </Col>
          <Col xs="auto">
            <Link className="footer-link" to='/terms-of-service'>Terms</Link>
          </Col>
        </Row>
      </Container>
    </footer>
  )
};

export default Footer;