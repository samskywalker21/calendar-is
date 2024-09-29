import { useContext, useEffect, useState } from 'react';

import EventList from '../ui/EventList';
import EventListSearch from '../ui/EventListSearch';

import EventContext from '../../context/EventContext';

import { Button, Stack } from '@mui/material';

function EventListPage() {
	const [allEvents, setAllEvents] = useState([]);

	const eventFunction = useContext(EventContext);

	const refreshList = () => {
		// eventFunction.getEventsLimit(setAllEvents);
		eventFunction.getEventsLimit(setAllEvents);
		console.log(allEvents);
	};

	useEffect(() => {
		console.log(allEvents);
	}, [allEvents]);

	useEffect(() => {
		refreshList();
	}, []);

	return (
		<>
			<Button onClick={refreshList}>Test</Button>
			<Stack spacing={2}>
				<EventListSearch setEventList={setAllEvents} />
				<EventList allEvents={allEvents} setAllEvents={setAllEvents} />
			</Stack>
		</>
	);
}

export default EventListPage;
