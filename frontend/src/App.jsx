import { useEffect, useState } from 'react';
import axios from 'axios';

import EventContext from './context/EventContext';
import Header from './components/layout/Header';
import Wrapper from './components/layout/Wrapper';

import { Outlet } from 'react-router-dom';

function App() {
    const [events, setEvents] = useState([{}]);

    const getEvents = () => {
        axios
            .get('http://localhost:3000/event')
            .then((res) => {
                // console.log(res.data);
                setEvents(res.data);
            })
            .catch((res) => {
                console.log(res);
            })
            .finally(() => {
                console.log('Fetching of data executed!');
            });
    };

    const addEvent = (event) => {
        axios
            .post('http://localhost:3000/event', event)
            .then((res) => {
                console.log(res);
            })
            .catch((res) => {
                console.log(res);
            })
            .finally(() => {
                console.log('Insertion of data executed!');
                getEvents();
            });
    };

    useEffect(() => {
        getEvents();
    }, []);

    const eventObj = { events, getEvents, addEvent };
    // const eventObj = { getEvents, addEvent, deleteEvent, filterEvents };

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
