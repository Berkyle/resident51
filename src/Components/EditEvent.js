import React, { useContext } from "react";

import { EventsContext } from "../Contexts/EventsContext";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import EventForm from "./EventForm";
import EventCreationFAQ from "./EventCreationFAQ";

const EditEvent = ({ match, history }) => {
  const { events, dispatchToEvents, formatEventDate } = useContext(EventsContext);

  // If the first navigation is to the edit form, show "loading event"
  if(events === null) {
    return (
      <Container fluid={true}>
        <Row className="justify-content-md-center">
          <Col className="HomeCard margin-bottom" sm={12} md={4}>
            <EventCreationFAQ />
          </Col>
          <Col className="HomeCard margin-bottom" sm={12} md={7}>
            <h1>Loading event...</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  const event_id = match.params.id;
  const eventToEdit = events.find(event => ''+event.id === ''+event_id);

  const onSubmit = event => {
    event.id = match.params.id;
    formatEventDate(event);
    dispatchToEvents({ type: 'MODIFY', event: event });
    history.push("/events", { update: 'Event updated!'});
  }

  return (
    <Container fluid={true}>
      <Row className="justify-content-md-center">
        <Col className="HomeCard margin-bottom" sm={12} md={4}>
          <EventCreationFAQ />
        </Col>
        <Col className="HomeCard margin-bottom" sm={12} md={7}>
          <h1>Edit This Event</h1>
          <hr />
          <EventForm
            onSubmit={onSubmit}
            event={{ ...eventToEdit, funding: undefined }} 
          />
        </Col>
      </Row>
    </Container>
  );
};

export default EditEvent;
