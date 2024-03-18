import { useState } from 'react';

import EventContext from './components/context/EventContext';
import Header from './components/layout/Header';
import Wrapper from './components/layout/Wrapper';

import { Outlet } from 'react-router-dom';

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
                <Wrapper>
                    <Outlet />
                </Wrapper>
            </EventContext.Provider>
        </>
    );
}

export default App;
