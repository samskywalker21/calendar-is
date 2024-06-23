import React, { useEffect, useState, useContext } from 'react';

import EventList from '../ui/EventList';
import EventListSearch from '../ui/EventListSearch';

import { Stack } from '@mui/material';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import LogInContext from '../../context/LogInContext';

function EventListPage() {
    const [eventList, setEventList] = useState([]);
    const nav = useNavigate();

    const loginObj = useContext(LogInContext);

    useEffect(() => {
        if (loginObj.isLoggedin == true) {
            axios({
                method: 'GET',
                url: `http://${import.meta.env.VITE_BACKEND_ADD}/event/sorted`,
            }).then((res) => {
                console.log(res);
            });
        } else {
            nav('/');
        }
    }, []);

    return (
        <>
            <Stack spacing={2}>
                <EventListSearch setEventList={setEventList} />
                <EventList eventList={eventList} />
            </Stack>
        </>
    );
}

export default EventListPage;
