import { useState } from 'react';

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

function Header() {
    const [isLoggedin, setLogIn] = useState(false);

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
                            {isLoggedin == true ? (
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
}

export default Header;
