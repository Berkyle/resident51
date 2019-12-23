import React, { useContext, useEffect } from "react";

import { EventDraftValidated } from '../Types/';

import { EventsContext } from "../Contexts/Events";

import { useHistory } from 'react-router-dom';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EventForm from "./Events/EventForm";
import EventCreationFAQ from "./Events/EventCreationFAQ";

const CreateEvent = () => {
  const history = useHistory();

  useEffect(() => {
    document.title = "CreateEvent | Resident 51";
  });

  const { dispatchToEvents, formatSubmittedEvent } = useContext(EventsContext);

  const onSubmit = (event: EventDraftValidated) => {
    const eventToDispatch = formatSubmittedEvent(event);
    dispatchToEvents({ type: "ADD", event: eventToDispatch });
    history.push("/events", { update: 'Event created!'});
  };

  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center">
        <Col sm={12} md={4}>
          <EventCreationFAQ />
        </Col>
        <Col sm={12} md={7}>
          <h1>Create New Event</h1>
          <hr />
          <EventForm onSubmit={onSubmit} />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateEvent;