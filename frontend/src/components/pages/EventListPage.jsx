import React from 'react';

import EventList from '../ui/EventList';
import EventListSearch from '../ui/EventListSearch';

import { Stack } from '@mui/material';

function EventListPage() {
    return (
        <>
            <Stack spacing={2}>
                <EventListSearch />
                <EventList />
            </Stack>
        </>
    );
}

export default EventListPage;
