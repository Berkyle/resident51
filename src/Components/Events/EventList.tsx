import React, { useContext } from 'react';
import { Events } from '../../Reducers/Events.Reducer';

import { EventsContext } from "../../Contexts/Events";
import { UserContext } from '../../Contexts/User';

import { EventTypeFilterState } from '../../Hooks/useEventTypes';

import Accordion from 'react-bootstrap/Accordion';
import Event from './Event';

type EventListProps = { events: Events, displayTypes?: EventTypeFilterState };
const EventList = (props: EventListProps) => {
  const { events, displayTypes } = props;
  const { eventTypes } = useContext(EventsContext);
  const { user } = useContext(UserContext);

  if (events === null) {
    return <h5><i>Loading events......</i></h5>
  }

  const showModify = !!user && user.permissions > 1;

  // Check if any types are being displayed and an event is of that type
  const anyToShow = displayTypes
                    ? Object.values(displayTypes).some(d => d[0]) &&
                      events.some(event => displayTypes[event.type][0])
                    : events.length;

  return anyToShow ?
    <Accordion className='mb-4' >
      {events
        .filter(event => displayTypes ? displayTypes[event.type][0] : true)
        .sort((e1, e2) => e1.dateTime as any - (e2.dateTime as any))
        .map(event =>
          event &&
          <Event
            showModify={showModify}
            key={`${event.id}_${event.publicStatus.type}`}
            event={event}
            format={eventTypes[event.type]}
          />)}
    </Accordion> :
    <h5>(No Events to Display)</h5>
};

export default EventList;