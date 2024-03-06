import React, { forwardRef, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
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
                aria-describedby='alert-dialog-slide-description'
            >
                <DialogContent>
                    <DialogTitle>Add Event</DialogTitle>
                    <EventForm />
                    <DialogContentText></DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Modal;
