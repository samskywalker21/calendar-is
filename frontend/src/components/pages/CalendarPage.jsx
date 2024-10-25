import { useContext, useEffect, useState } from 'react';

import EventContext from '../../context/EventContext';
import useEventStore from '../../stores/eventStore';

import CalendarMonthComponent from '../calendar/CalendarMonthComponent';
import ViewModal from '../ui/ViewModal';
import {
	Container,
	Stack,
	Switch,
	FormGroup,
	FormControlLabel,
} from '@mui/material';

const CalendarPage = () => {
	const eventFunctions = useContext(EventContext);
	const filterApEv = useEventStore((state) => state.filterApEv);
	const filterApMn = useEventStore((state) => state.filterApMn);
	const filterPeEv = useEventStore((state) => state.filterPeEv);
	const filterPeMn = useEventStore((state) => state.filterPeMn);
	const updateFilter = useEventStore((state) => state.updateFilter);
	const updateCalendarEvents = useEventStore(
		(state) => state.updateCalendarEvents,
	);

	const [isOpen, handleClick] = useState(false);
	const [viewEvent, setViewEvent] = useState({});

	const filters = [filterApEv, filterApMn, filterPeEv, filterPeMn];

	const changeModal = () => {
		handleClick((prevState) => {
			return !prevState;
		});
	};

	const changeViewEvent = (obj) => {
		const event = {
			_id: obj.extendedProps._id,
			title: obj.title,
			start: obj.start,
			end: obj.end,
			division: obj.extendedProps.division,
			csu: obj.extendedProps.csu,
			csuHead: obj.extendedProps.csuHead,
			participants: obj.extendedProps.participants,
			status: obj.status,
			type: obj.extendedProps.type,
		};
		setViewEvent(event);
	};

	useEffect(() => {
		if (Object.keys(viewEvent).length <= 0) {
			return;
		} else {
			changeModal();
		}
	}, [viewEvent]);

	useEffect(() => {
		eventFunctions.getEventsWithFilter(
			updateCalendarEvents,
			filterApEv,
			filterApMn,
			filterPeEv,
			filterPeMn,
		);
	}, [filterApEv, filterApMn, filterPeEv, filterPeMn]);

	const handleChangeFilter = (index) => {
		filters[index] = !filters[index];
		updateFilter(...filters);
	};

	return (
		<>
			<ViewModal
				isOpen={isOpen}
				changeModal={changeModal}
				viewEvent={viewEvent}
			/>
			<Container maxWidth='lg'>
				<Stack direction={'row'} marginBottom={4} paddingX={20}>
					<FormGroup row>
						<FormControlLabel
							control={
								<Switch
									checked={filters[0]}
									onChange={() => {
										handleChangeFilter(0);
									}}
								/>
							}
							label='Approved Events'
						/>
						<FormControlLabel
							control={
								<Switch
									checked={filters[1]}
									onChange={() => {
										handleChangeFilter(1);
									}}
								/>
							}
							label='Approved Monitoring'
						/>
						<FormControlLabel
							control={
								<Switch
									checked={filters[2]}
									onChange={() => {
										handleChangeFilter(2);
									}}
								/>
							}
							label='Pending Events'
						/>
						<FormControlLabel
							control={
								<Switch
									checked={filters[3]}
									onChange={() => {
										handleChangeFilter(3);
									}}
								/>
							}
							label='Pending Monitoring'
						/>
					</FormGroup>
				</Stack>
				<CalendarMonthComponent
					changeModal={changeModal}
					changeViewEvent={changeViewEvent}
				/>
			</Container>
		</>
	);
};

export default CalendarPage;
