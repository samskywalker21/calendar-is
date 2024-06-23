import { useState, useContext } from 'react';

import EventFormModal from '../ui/EventFormModal';
import LoggedIn from './LoggedIn';
import LogInModal from './LogInModal';

import { Link } from 'react-router-dom';

import {
    Stack,
    Button,
    AppBar,
    Box,
    Toolbar,
    Typography,
    CssBaseline,
} from '@mui/material';
import LogInContext from '../../context/LogInContext';

const Header = ({ isLoggedin, setLogIn }) => {
    const loginObj = useContext(LogInContext);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <CssBaseline>
                    <AppBar position='sticky'>
                        <Toolbar>
                            <Typography
                                variant='h6'
                                component={'div'}
                                sx={{ flexGrow: 1 }}
                            >
                                <Link to={'/'}>Training Calendar</Link>
                            </Typography>
                            {loginObj.isLoggedin == true ? (
                                <LoggedIn
                                    setLogIn={setLogIn}
                                    check={isLoggedin}
                                />
                            ) : (
                                <LogInModal
                                    setLogIn={setLogIn}
                                    check={isLoggedin}
                                />
                            )}
                        </Toolbar>
                    </AppBar>
                </CssBaseline>
            </Box>
        </>
    );
};

export default Header;
