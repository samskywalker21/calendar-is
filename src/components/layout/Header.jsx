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
import Modal from '../ui/EventFormModal';

function Header() {
    const [open, isOpen] = useState(false);

    const handleClick = () => {
        isOpen(!open);
    };

    return (
        <>
            <Modal open={open} handleClick={handleClick} />
            <Box sx={{ flexGrow: 1 }}>
                <CssBaseline>
                    <AppBar position='static'>
                        <Toolbar>
                            <Typography
                                variant='h6'
                                component={'div'}
                                sx={{ flexGrow: 1 }}
                            >
                                Training Calendar
                            </Typography>
                            <Button color='inherit' onClick={handleClick}>
                                Add Event/Training
                            </Button>
                        </Toolbar>
                    </AppBar>
                </CssBaseline>
            </Box>
        </>
    );
}

export default Header;
