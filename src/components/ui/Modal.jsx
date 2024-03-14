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

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

function Modal(props) {
    const { open, handleClick } = props;

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClick}
            >
                <DialogContent>
                    <DialogTitle>Add Event/Training</DialogTitle>
                    <EventForm handleClick={handleClick} />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Modal;
