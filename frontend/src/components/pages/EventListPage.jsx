import { useContext, useEffect, useState } from 'react';

import EventList from '../ui/EventList';
import EventListSearch from '../ui/EventListSearch';

import EventContext from '../../context/EventContext';

import { Button, Stack } from '@mui/material';

function EventListPage() {
	const eventFunction = useContext(EventContext);

	useEffect(() => {
		eventFunction.getEventsLimit(eventFunction.setAllEvents);
	}, []);

	return (
		<>
			<Stack spacing={2}>
				<EventListSearch setEventList={eventFunction.setAllEvents} />
				<EventList />
			</Stack>
		</>
	);
}

export default EventListPage;
