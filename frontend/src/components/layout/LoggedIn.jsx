import React, { useState, useContext } from 'react';

import EventFormModal from '../ui/EventFormModal';

import { Button, Box } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';
import LogInContext from '../../context/LogInContext';
import LogInModal from './LogInModal';

function LoggedIn() {
    const [open, isOpen] = useState(false);
    const loginObj = useContext(LogInContext);

    const nav = useNavigate();

    const handleClick = () => {
        isOpen(!open);
    };

    const handleLogOut = () => {
        loginObj.flipLogin();
        sessionStorage.removeItem('isLoggedIn');
        nav('/');
    };

    return (
        <>
            <EventFormModal
                open={open}
                handleClick={handleClick}
                isEdit={false}
            />
            <Box>
                {loginObj.isLoggedin == true ? (
                    <Button color='inherit' onClick={handleLogOut}>
                        Log Out
                    </Button>
                ) : (
                    <LogInModal />
                )}
                <Button color='inherit' onClick={handleClick}>
                    Add Event/Training
                </Button>
                <Button color='inherit' component={Link} to='/'>
                    Event Calendar
                </Button>
                <Button color='inherit' component={Link} to='events'>
                    Event List
                </Button>
            </Box>
        </>
    );
}

export default LoggedIn;
