import React, { forwardRef, useContext, useEffect } from 'react';

//Context
import EventContext from '../../context/EventContext';

//Material UI
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
} from '@mui/material';

import useEventStore from '../../stores/eventStore';
import useNotifStore from '../../stores/notifStore';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='down' ref={ref} {...props} />;
});

const ActionModal = (props) => {
	const eventFunctions = useContext(EventContext);
	const setAllEvents = useEventStore((state) => state.updateListEvents);
	const setCalendarEvents = useEventStore(
		(state) => state.updateCalendarEvents,
	);
	const openNotif = useNotifStore((state) => state.openNotif);

	const { open, handleClick, _id, title, message, action } = props;

	const actionHandler = () => {
		eventFunctions.updateEventStatus(
			_id,
			action,
			setCalendarEvents,
			setAllEvents,
			handleClick,
		);
		switch (action) {
			case 'Approve':
				openNotif('Event has been approved!', 'success');
				break;
			case 'Disapprove':
				openNotif('Event has been disapproved!', 'error');
				break;
			case 'Return':
				openNotif('Event has been returned!', 'info');
				break;
			case 'Delete':
				openNotif('Event has been deleted!', 'error');
				break;
		}
	};

	return (
		<>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClick}
			>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<DialogContentText>{message}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={actionHandler}>{action}</Button>
					<Button onClick={handleClick}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ActionModal;
