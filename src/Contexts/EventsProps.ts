import { Hall, CFSEvent, EventToCFS, EventR51, EventForm, EventTypeFormats, EventFormValidated } from '../Types/';
import moment, { Moment } from 'moment';

export const eventTypes: EventTypeFormats = {
  social: { formal: "Social Event", color: "green" },
  meeting: { formal: "Meeting", color: "orange" },
  community: { formal: "Community Event", color: "plum" },
  meal: { formal: "Co-Hall Meal", color: "lightcoral" },
  alumni: { formal: "Alumni Event", color: "maroon" },
  campus: { formal: "Campus Event", color: "lightseagreen" }
};

export const halls: Hall[] = [
  "Battenfeld",
  "Douthart",
  "Grace Pearson",
  "KK Amini",
  "Krehbiel",
  "Margaret Amini",
  "Miller",
  "Pearson",
  "Rieger",
  "Sellards",
  "Stephenson",
  "Watkins"
];

const determineEventType = (publicStatusCFS: CFSEvent['publicStatus']): EventR51['publicStatus']['type'] => {
  if (publicStatusCFS.type === 'private') {
    return (publicStatusCFS.halls.length === 1) ? 'hall' : 'halls'
  } else {
    return 'public';
  }
}

// Format event queried from Firebase
export const formatRetrievedEvent = (event: CFSEvent): EventR51 => ({
  ...event,
  dateTime: moment(event.dateTime.toDate()),
  publicStatus: {
    type: determineEventType(event.publicStatus),
    halls: event.publicStatus.halls,
  }
});

const determineCFSEventType = (hall: Hall, publicStatus: EventR51['publicStatus']): CFSEvent['publicStatus'] => ({
  type: publicStatus.type === 'public' ? 'public' : 'private',
  halls: (publicStatus.type === 'public')
            ? halls : publicStatus.type === 'hall'
              ? [hall] : publicStatus.halls,
});

// Format event before sending to Firebase
export const formatSubmittedEventByHall = (hall: Hall) => (event: EventFormValidated): EventToCFS => {
  // destructure date and time off of event
  const { date, time, ...CFSEvent} = event;
  const [hour, minute] = time.split(':');

  return {
    ...CFSEvent,
    dateTime: date.hour(+hour).minute(+minute).toDate(),
    publicStatus: determineCFSEventType(hall, event.publicStatus),
  };
}