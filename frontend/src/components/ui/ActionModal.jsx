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

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

const ActionModal = (props) => {
    const eventFunctions = useContext(EventContext);

    const { open, handleClick, _id, title, message, action } = props;

    const actionHandler = () => {
        eventFunctions.updateEvent(_id, action);
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
                    <Button onClick={actionHandler}>{action}</Button>
                    <Button onClick={handleClick}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ActionModal;
