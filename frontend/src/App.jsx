import { useState } from 'react';

import EventContext from './components/context/EventContext';
import Header from './components/layout/Header';
import Wrapper from './components/layout/Wrapper';

import { Outlet } from 'react-router-dom';

function App() {
    const [events, setEvents] = useState([{}]);

    const addEvent = (event) => {
        const cleanEvents = events.filter((row) => {
            if (Object.hasOwn(row, 'title')) {
                return row;
            }
        });

        const newEvents = [...cleanEvents, event];
        setEvents(newEvents);
    };

    const deleteEvent = (id) => {
        const cleanEvents = events.filter((row) => {
            if (Object.hasOwn(row, 'title')) {
                return row;
            }
        });

        const newEvents = cleanEvents.filter((row) => {
            if (row.extendedProps._id != id) return row;
        });

        setEvents(newEvents);
    };

    const getEvents = () => {
        const cleanEvents = events.filter((row) => {
            if (Object.hasOwn(row, 'title')) {
                return row;
            }
        });

        return cleanEvents;
    };

    const filterEvents = (id) => {
        const cleanEvents = events.filter((row) => {
            if (Object.hasOwn(row, 'title')) {
                return row;
            }
        });

        const event = cleanEvents.filter((row) => {
            if (row.extendedProps._id == id) return row;
        });

        return event;
    };

    const eventObj = { getEvents, addEvent, deleteEvent, filterEvents };

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
