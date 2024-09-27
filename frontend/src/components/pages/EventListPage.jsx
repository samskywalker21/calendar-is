import { useContext, useEffect, useState } from 'react';

import EventList from '../ui/EventList';
import EventListSearch from '../ui/EventListSearch';

import EventContext from '../../context/EventContext';

import { Stack } from '@mui/material';

function EventListPage() {
	const [allEvents, setAllEvents] = useState([]);

	const eventFunction = useContext(EventContext);

	useEffect(() => {
		console.log(
			'********************  This is triggered ********************',
		);
	}, [allEvents]);

	const refreshList = async (fn = () => {}) => {
		await eventFunction.getEventsLimit(setAllEvents);
		if (fn) await fn();
	};

	useEffect(() => {
		refreshList();
	}, []);

	return (
		<>
			<Stack spacing={2}>
				<EventListSearch setEventList={setAllEvents} />
				<EventList allEvents={allEvents} refreshList={refreshList} />
			</Stack>
		</>
	);
}

export default EventListPage;
