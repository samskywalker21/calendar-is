import { useEffect, useState } from 'react';

import CalendarMonthComponent from '../calendar/CalendarMonthComponent';
import ViewModal from '../ui/ViewModal';
import {
	Container,
	Stack,
	Switch,
	FormGroup,
	FormControlLabel,
} from '@mui/material';

function CalendarPage() {
	const [isOpen, handleClick] = useState(false);
	const [viewEvent, setViewEvent] = useState({});
	const [aEvent, setAEvent] = useState(false);
	const [pEvent, setPEvent] = useState(false);
	const [aMont, setAMont] = useState(false);
	const [pMont, setPMont] = useState(false);

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
			type: obj.type,
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
				<Stack direction={'row'} marginBottom={4} paddingX={20}>
					<FormGroup row>
						<FormControlLabel
							control={
								<Switch
									checked={aEvent}
									onChange={() => {
										setAEvent((prevState) => !prevState);
									}}
								/>
							}
							label='Approved Events'
						/>
						<FormControlLabel
							control={
								<Switch
									checked={aMont}
									onChange={() => {
										setAMont((prevState) => !prevState);
									}}
								/>
							}
							label='Approved Monitoring'
						/>
						<FormControlLabel
							control={
								<Switch
									checked={pEvent}
									onChange={() => {
										setPEvent((prevState) => !prevState);
									}}
								/>
							}
							label='Pending Events'
						/>
						<FormControlLabel
							control={
								<Switch
									checked={pMont}
									onChange={() => {
										setPMont((prevState) => !prevState);
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
}

export default CalendarPage;
