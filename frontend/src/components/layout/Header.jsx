import { useState } from 'react';

import {
    Stack,
    Button,
    AppBar,
    Box,
    Toolbar,
    Typography,
    CssBaseline,
} from '@mui/material';
import EventFormModal from '../ui/EventFormModal';

import { Link } from 'react-router-dom';

function Header() {
    const [open, isOpen] = useState(false);

    const handleClick = () => {
        isOpen(!open);
    };

    return (
        <>
            <EventFormModal
                open={open}
                handleClick={handleClick}
                isEdit={false}
            />
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
                            <Button color='inherit' onClick={handleClick}>
                                Add Event/Training
                            </Button>
                            <Button color='inherit' component={Link} to='/'>
                                Event Calendar
                            </Button>
                            <Button
                                color='inherit'
                                component={Link}
                                to='events'
                            >
                                Event List
                            </Button>
                        </Toolbar>
                    </AppBar>
                </CssBaseline>
            </Box>
        </>
    );
}

export default Header;
