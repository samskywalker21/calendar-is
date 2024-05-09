import { useEffect, useState } from 'react';
import axios from 'axios';

import EventContext from './context/EventContext';
import Header from './components/layout/Header';
import Wrapper from './components/layout/Wrapper';

import { Outlet } from 'react-router-dom';

function App() {
    const [events, setEvents] = useState([{}]);

    const dburl = `http://${import.meta.env.VITE_BACKEND_ADD}:3000`;

    // Get All Events
    const getEvents = () => {
        axios
            .get(`${dburl}/event`)
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

    // Add New Event
    const addEvent = (event) => {
        axios
            .post(`${dburl}/event`, event)
            .then()
            .catch((res) => {
                console.log(res);
            })
            .finally(() => {
                console.log('Insertion of data executed!');
                getEvents();
            });
    };

    //Find Specific Event via ID
    // const findEvent = (id) => {
    //     axios
    //         .get(`http://localhost:3000/event/${id}`)
    //         .then((res) => {
    //             setFiltEvent(res.data);
    //         })
    //         .catch((res) => {
    //             console.log(res);
    //         })
    //         .finally(() => {
    //             console.log('Fetching of data executed!');
    //         });

    //     return event;
    // };

    //Delete Event via ID
    const deleteEvent = (id) => {
        axios
            .delete(`${dburl}/event/${id}`)
            .then((res) => {
                return res.data;
            })
            .catch((res) => {
                console.log(res);
            })
            .finally(() => {
                console.log('Deletion of data executed!');
                getEvents();
            });
    };

    useEffect(() => {
        getEvents();
    }, []);

    const eventObj = {
        events,
        getEvents,
        addEvent,
        deleteEvent,
    };
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
