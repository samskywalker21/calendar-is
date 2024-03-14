import { createContext } from 'react';

const events = { text: 'Itworks!' };

const EventContext = createContext(events);

export default EventContext;
