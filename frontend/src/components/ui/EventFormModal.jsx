import React, { forwardRef, useState } from 'react';

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slide,
} from '@mui/material';

import EventForm from './EventForm';
import EventFormEdit from './EventFormEdit';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='down' ref={ref} {...props} />;
});

function EventFormModal(props) {
	const { open, handleClick, isEdit } = props;

	return (
		<>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClick}
			>
				<DialogContent sx={{ width: 500 }}>
					<DialogTitle>Add Event/Training</DialogTitle>
					{isEdit == false ? (
						<EventForm handleClick={handleClick} />
					) : (
						<EventFormEdit
							handleClick={handleClick}
							id={props._id}
						/>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}

export default EventFormModal;
