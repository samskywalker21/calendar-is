import React, { forwardRef, useContext, useEffect } from 'react';

//Context
import EventContext from '../context/EventContext';

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

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

const DeleteModal = (props) => {
    const eventObj = useContext(EventContext);

    const { open, handleClick, _id, title, message } = props;

    const handleClickDelete = () => {
        console.log(_id);
        eventObj.deleteEvent(_id);
        handleClick();
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
                    <Button onClick={handleClickDelete}>Delete</Button>
                    <Button onClick={handleClick}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteModal;
