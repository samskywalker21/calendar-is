import { useContext, useEffect } from 'react';

import EventList from '../ui/EventList';
import EventListSearch from '../ui/EventListSearch';

import EventContext from '../../context/EventContext';

import { Container, Stack } from '@mui/material';

function EventListPage() {
	const eventFunction = useContext(EventContext);

	useEffect(() => {
		eventFunction.getEventsLimit(eventFunction.setAllEvents);
	}, []);

	return (
		<>
			<Container maxWidth>
				<Stack spacing={2}>
					<EventListSearch />
					<EventList />
				</Stack>
			</Container>
		</>
	);
}

export default EventListPage;
