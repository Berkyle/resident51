import React, { useContext, useMemo } from 'react';

import { EventR51, EventForm as EventFormType, Hall } from '../../Types/';

import { EventsContext } from '../../Contexts/Events';
import { UserContext } from '../../Contexts/User';

import moment from 'moment';
import { Formik, Field, FastField, FormikHelpers } from 'formik';

import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import EventNameInput from './EventForm/Name';
import EventTypeInput from './EventForm/Type';
import EventDescriptionInput from './EventForm/Description';
import EventDateInput from './EventForm/Date';
import EventTimeInput from './EventForm/Time';
import EventLocationInput from './EventForm/Location';
import EventPublicInput from './EventForm/Public';
import EventFacilitationInput from './EventForm/Facilitation';

import PromptIfDirty from '../Common/PromptIfDirty';

import validationSchema from './EventForm/validationSchema';

const threeDaysFromNow = Date.now() + 1000 * 60 * 60 * 24 * 3;
const updatedWarning = (
  <Alert variant="warning">
    Someone else just updated this event. If you submit now, those changes would be overwritten.
    Please save your changes and refresh the page.
  </Alert>
);

export type EventFormValues = {
  name: string;
  type: string;
  description: string;
  location: string;
  date: number;
  time: string;
  publicStatus: {
    type: string;
    halls: Hall[];
  };
  facilitation: {
    organizationType: string;
    organizationName: string;
  };
};

type EventFormProps = {
  event?: EventR51;
  onSubmit: (event: EventFormType, actions: FormikHelpers<EventFormType>) => void;
  eventUpdated?: boolean;
};
const EventFormComponent: React.FC<EventFormProps> = props => {
  const { event = {} as EventR51, onSubmit, eventUpdated = false } = props;
  const { eventTypes, halls } = useContext(EventsContext);
  const { user } = useContext(UserContext);

  const formValidationSchema = useMemo(() => validationSchema({ halls, eventTypes }), [
    halls,
    eventTypes,
  ]);

  if (!user.uid) return <div />;

  const dateTimeMoment = moment(event.dateTime || threeDaysFromNow);
  const formInitialValues: EventFormType = {
    id: event.id || '',
    name: event.name || '',
    type: event.type || undefined,
    description: event.description || '',
    location: event.location || '',
    date: dateTimeMoment.unix(),
    time: event.dateTime ? dateTimeMoment.format('kk:mm') : '18:00',
    publicStatus: event.publicStatus || {
      type: 'public',
      halls: [user.hall],
    },
    facilitation: event.facilitation || {
      organizationType: undefined,
      organizationName: '',
    },
  };

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={onSubmit}
      validationSchema={formValidationSchema}
    >
      {({ handleSubmit, isSubmitting }): React.ReactElement => {
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <PromptIfDirty />

            {eventUpdated && updatedWarning}

            <h3>1. Name the event</h3>
            <FastField name="name" component={EventNameInput} />

            <hr />
            <h3>2. Describe the event</h3>
            <FastField name="type" component={EventTypeInput} />
            <FastField name="description" component={EventDescriptionInput} />

            <hr />
            <h3>3. Choose a time</h3>
            <Row>
              <Col xs={12} md={6}>
                <FastField name="date" component={EventDateInput} />
              </Col>
              <Col xs={12} sm={10} md={6}>
                <FastField name="time" component={EventTimeInput} />
              </Col>
            </Row>

            <hr />
            <h3>4. Choose a location</h3>
            <FastField name="location" component={EventLocationInput} />

            <hr />
            <h3>5. Choose attendees</h3>
            <FastField name="publicStatus" component={EventPublicInput} />

            <hr />
            <h3>6. Extra Info</h3>
            <Field name="facilitation" component={EventFacilitationInput} />

            {eventUpdated && updatedWarning}

            <Row className="mt-5">
              <Col xl={3} lg={3} md={4} sm={4} className="mb-3 pr-sm-0">
                <Button
                  block
                  variant="secondary"
                  size="lg"
                  type="button"
                  onClick={(): void => alert("Psyche! That doesn't work AT ALL!")}
                  disabled={isSubmitting}
                >
                  Save draft
                </Button>
              </Col>
              <Col className="mb-3">
                <Button block variant="primary" size="lg" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EventFormComponent;
