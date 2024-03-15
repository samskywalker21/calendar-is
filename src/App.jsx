import { useState } from 'react';

import EventContext from './components/context/EventContext';
import CalendarMonthComponent from './components/calendar/CalendarMonthComponent';
import Header from './components/layout/Header';

function App() {
    const [events, setEvents] = useState([{}]);

    const addEvent = (event) => {
        const newEvents = [...events, event];
        setEvents(newEvents);
    };

    const eventObj = { events, addEvent };

    return (
        <>
            <EventContext.Provider value={eventObj}>
                <Header />
                <CalendarMonthComponent />
            </EventContext.Provider>
        </>
    );
}

export default App;
