import React, { useState } from 'react';

import EventFormModal from '../ui/EventFormModal';

import { Button, Fade, Box } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

function LoggedIn({ setLogIn, check }) {
    const [open, isOpen] = useState(false);

    const nav = useNavigate();

    const handleClick = () => {
        isOpen(!open);
    };

    const handleLogOut = () => {
        setLogIn(false);
        nav('/');
    };

    return (
        <>
            <EventFormModal
                open={open}
                handleClick={handleClick}
                isEdit={false}
            />
            <Fade in={check} timeout={{ enter: 1000, exit: 1000 }}>
                <Box>
                    <Button color='inherit' onClick={handleClick}>
                        Add Event/Training
                    </Button>
                    <Button color='inherit' component={Link} to='/'>
                        Event Calendar
                    </Button>
                    <Button color='inherit' component={Link} to='events'>
                        Event List
                    </Button>
                    <Button color='inherit' onClick={handleLogOut}>
                        Log Out
                    </Button>
                </Box>
            </Fade>
        </>
    );
}

export default LoggedIn;
