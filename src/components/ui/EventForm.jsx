import React from 'react';
import { useContext, useRef } from 'react';
import EventContext from '../context/EventContext';

import { Stack, TextField, MenuItem, Button } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const EventForm = ({ handleClick }) => {
    const eventObj = useContext(EventContext);

    const titleRef = useRef('');
    const startDateRef = useRef('');
    const endDateRef = useRef('');
    const divRef = useRef('');
    const csuRef = useRef('');
    const csuHeadRef = useRef('');

    const addEventHandler = (e) => {
        e.preventDefault();
        // console.log(e);
        // for (let i = 0; i < e.target.length; i++) {
        //     if (e.target[i].name != '')
        //         console.log(
        //             `Index: ${i}, Name: ${e.target[i].name}, Value: ${e.target[i].value}`
        //         );
        // }

        const color =
            e.target[8].value == 'ORD/ARD'
                ? '#C9190B'
                : e.target[8].value == 'LHSD'
                ? '#519DE9'
                : e.target[8].value == 'RLED'
                ? '#7CC674'
                : e.target[8].value == 'MSD'
                ? '#EF9234'
                : '#F4C145';

        const newEvent = {
            title: e.target[0].value,
            start: dayjs(e.target[2].value).toDate(),
            end: dayjs(e.target[5].value).toDate(),
            backgroundColor: color,
            extendedProps: {
                division: e.target[8].value,
                csu: e.target[10].value,
                csuHead: e.target[12].value,
            },
        };
        eventObj.addEvent(newEvent);
        // console.log(newEvent);

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
                        ref={titleRef}
                        defaultValue=''
                    />
                    <DateTimePicker
                        label='Start Date'
                        name='startDate'
                        id='startDateId'
                        ref={startDateRef}
                        defaultValue=''
                    />
                    <DateTimePicker
                        label='End Date'
                        name='endDate'
                        id='endDateId'
                        ref={endDateRef}
                        defaultValue=''
                    />
                    <TextField
                        id='divisionId'
                        name='division'
                        label='Division'
                        select
                        ref={divRef}
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
                        ref={csuRef}
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
                        ref={csuHeadRef}
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
