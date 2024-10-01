import { useEffect, useState } from 'react';

import CalendarMonthComponent from '../calendar/CalendarMonthComponent';
import ViewModal from '../ui/ViewModal';
import { Container } from '@mui/material';

function CalendarPage() {
	const [isOpen, handleClick] = useState(false);
	const [viewEvent, setViewEvent] = useState({});

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

	return (
		<>
			<ViewModal
				isOpen={isOpen}
				changeModal={changeModal}
				viewEvent={viewEvent}
			/>
			<Container maxWidth='lg'>
				<CalendarMonthComponent
					changeModal={changeModal}
					changeViewEvent={changeViewEvent}
				/>
			</Container>
		</>
	);
}

export default CalendarPage;
