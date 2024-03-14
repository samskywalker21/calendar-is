import React from 'react';
import { useContext } from 'react';
import EventContext from '../context/EventContext';

import { Stack, TextField, MenuItem, Button } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const EventForm = ({ handleClick }) => {
    const testString = useContext(EventContext);

    const addEventHandler = (e) => {
        e.preventDefault();
        // console.log(e);
        // for (let i = 0; i < e.target.length; i++) {
        //     if (e.target[i].name != '')
        //         console.log(
        //             `Index: ${i}, Name: ${e.target[i].name}, Value: ${e.target[i].value}`
        //         );
        // }
        console.log(testString);
        handleClick();
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack
                    direction={'column'}
                    spacing={2}
                    component={'form'}
                    onSubmit={addEventHandler}
                >
                    <TextField
                        id='titleId'
                        name='title'
                        label='Event/Training Title'
                        defaultValue=''
                    />
                    <DateTimePicker
                        label='Start Date'
                        name='startDate'
                        id='startDateId'
                    />
                    <DateTimePicker
                        label='End Date'
                        name='endDate'
                        id='endDateId'
                    />
                    <TextField
                        id='divisionId'
                        name='division'
                        label='Division'
                        select
                        defaultValue=''
                    >
                        <MenuItem value='ORD/ARD'>ORD/ARD</MenuItem>
                        <MenuItem value='LHSD'>LHSD</MenuItem>
                        <MenuItem value='RLED'>RLED</MenuItem>
                        <MenuItem value='MSD'>MSD</MenuItem>
                    </TextField>
                    <TextField
                        id='csuId'
                        name='csu'
                        label='Cluster/Section/Unit'
                        select
                        defaultValue=''
                    >
                        <MenuItem value='Test 1'>Test 1</MenuItem>
                        <MenuItem value='Test 2'>Test 2</MenuItem>
                        <MenuItem value='Test 3'>Test 3</MenuItem>
                        <MenuItem value='Test 4'>Test 4</MenuItem>
                        <MenuItem value='Test 5'>Test 5</MenuItem>
                    </TextField>
                    <TextField
                        id='csuHeadId'
                        name='csuHead'
                        label='Program Manager/C/S/U Head'
                        defaultValue=''
                    />
                    <Stack spacing={1}>
                        <Button
                            type='submit'
                            label='Add Event'
                            variant='contained'
                            fullWidth
                        >
                            Add Event
                        </Button>
                        <Button
                            type='reset'
                            label='Clear'
                            variant='contained'
                            color='warning'
                            fullWidth
                        >
                            Clear
                        </Button>
                    </Stack>
                </Stack>
            </LocalizationProvider>
        </>
    );
};

export default EventForm;
