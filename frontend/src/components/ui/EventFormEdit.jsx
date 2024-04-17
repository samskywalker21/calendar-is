import React, { useRef } from 'react';
import { useContext } from 'react';

// Context
import EventContext from '../../context/EventContext';

//UUID
import { v4 as uuidv4 } from 'uuid';

// Material UI
import { Stack, TextField, MenuItem, Button } from '@mui/material';

// Material UI DateTime Picker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const EventFormEdit = ({ handleClick, id }) => {
    const eventObj = useContext(EventContext);

    const eventDetails = eventObj.filterEvents(id);

    console.log(eventDetails);

    //Field Refs
    const titleRef = useRef('');
    const startDateRef = useRef('');
    const endDateRef = useRef('');
    const divRef = useRef('');
    const csuRef = useRef('');
    const csuHeadRef = useRef('');

    const clearRefs = () => {
        titleRef.current.value = null;
        startDateRef.current.value = null;
        endDateRef.current.value = null;
        divRef.current.value = null;
        csuRef.current.value = null;
        csuHeadRef.current.value = null;
    };

    const addEventHandler = (e) => {
        e.preventDefault();

        // Fields Test
        // console.log(e);
        // for (let i = 0; i < e.target.length; i++) {
        //     if (e.target[i].name != '')
        //         console.log(
        //             `Index: ${i}, Name: ${e.target[i].name}, Value: ${e.target[i].value}`
        //         );
        // }

        const color =
            divRef.current.value == 'ORD/ARD'
                ? '#C9190B'
                : divRef.current.value == 'LHSD'
                ? '#519DE9'
                : divRef.current.value == 'RLED'
                ? '#7CC674'
                : divRef.current.value == 'MSD'
                ? '#EF9234'
                : '#F4C145';

        const newEvent = {
            title: titleRef.current.value,
            start: dayjs(startDateRef.current.value).toDate(),
            end: dayjs(endDateRef.current.value).toDate(),
            backgroundColor: color,
            extendedProps: {
                _id: uuidv4(),
                division: divRef.current.value,
                csu: csuRef.current.value,
                csuHead: csuHeadRef.current.value,
            },
        };
        eventObj.addEvent(newEvent);

        clearRefs();
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
                        inputRef={titleRef}
                        required
                    />
                    <DateTimePicker
                        label='Start Date'
                        name='startDate'
                        id='startDateId'
                        // defaultValue=''
                        inputRef={startDateRef}
                        required
                    />
                    <DateTimePicker
                        label='End Date'
                        name='endDate'
                        id='endDateId'
                        // defaultValue=''
                        inputRef={endDateRef}
                        required
                    />
                    <TextField
                        id='divisionId'
                        name='division'
                        label='Division'
                        defaultValue=''
                        inputRef={divRef}
                        select
                        required
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
                        defaultValue=''
                        inputRef={csuRef}
                        select
                        required
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
                        inputRef={csuHeadRef}
                        required
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
                            type='button'
                            label='Clear'
                            variant='contained'
                            color='warning'
                            fullWidth
                            onClick={clearRefs}
                        >
                            Clear
                        </Button>
                    </Stack>
                </Stack>
            </LocalizationProvider>
        </>
    );
};

export default EventFormEdit;
