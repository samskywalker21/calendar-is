import React, { useState, useRef, useContext } from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Typography,
    TextField,
    Paper,
    Stack,
    Fade,
} from '@mui/material';
import LogInContext from '../../context/LogInContext';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const LogInModal = () => {
    const loginObj = useContext(LogInContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [errorInput, setErrorInput] = useState(false);
    const passRef = useRef(null);

    const [passVal, setPassVal] = useState(null);

    const handleClick = () => {
        setModalOpen(!modalOpen);
    };

    const handleChange = (e) => {
        if (e.key === 'Enter') {
            console.log('test');
        }
        setPassVal(passRef.current.value);
    };

    const handleCancel = () => {
        passRef.current.value = null;
        setPassVal(null);
        setErrorInput(false);
        setModalOpen(!modalOpen);
    };

    const handleLogin = () => {
        if (import.meta.env.VITE_PASSWORD == passVal) {
            // setLogIn(true);
            loginObj.flipLogin();
            setPassVal(null);
            passRef.current.value = null;
            setModalOpen(!modalOpen);
        } else {
            passRef.current.value = null;
            setErrorInput(!errorInput);
        }
    };

    return (
        <>
            <Paper>
                <Dialog
                    open={modalOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClick}
                >
                    <DialogTitle textAlign={'center'}>
                        <Typography variant='h4'>Log In</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Stack>
                            <TextField
                                id='password'
                                label='Password'
                                variant='outlined'
                                type='password'
                                sx={{ mt: 1 }}
                                inputRef={passRef}
                                onChange={handleChange}
                                defaultValue={passVal}
                                required
                            />
                        </Stack>
                        <Stack
                            direction='row'
                            justifyContent='center'
                            alignItems='left'
                            spacing={3}
                            sx={{ mt: 2 }}
                        >
                            <Button
                                color='success'
                                variant='outlined'
                                onClick={handleLogin}
                            >
                                Log In
                            </Button>
                            <Button
                                color='error'
                                variant='outlined'
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </DialogContent>
                </Dialog>
            </Paper>
            <Fade in={true}>
                <Button color='inherit' onClick={handleClick}>
                    Log In
                </Button>
            </Fade>
        </>
    );
};

export default LogInModal;
