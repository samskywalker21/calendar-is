import React, { useRef, useState, useEffect } from 'react';

// Context
import EventContext from '../../context/EventContext';

// Material UI
import { Stack, TextField, MenuItem, Button } from '@mui/material';

// Material UI DateTime Picker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const EventFormEdit = ({ handleClick, data }) => {
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

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack
                    direction={'column'}
                    spacing={2}
                    component={'form'}
                    // onSubmit={addEventHandler}
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
                        <MenuItem value='RESDRU'>ORD - RESDRU</MenuItem>
                        <MenuItem value='Legal/PACD'>ORD - Legal/PACD</MenuItem>
                        <MenuItem value='CHEPU'>ORD - CHEPU</MenuItem>
                        <MenuItem value='HFDU'>ORD - HFDU</MenuItem>
                        <MenuItem value='Infra'>ORD - Infra</MenuItem>
                        <MenuItem value='CMU'>ORD - CMU</MenuItem>
                        <MenuItem value='Research'>ORD - Research</MenuItem>
                        <MenuItem value='LHSDC'>LHSD - LHSDC</MenuItem>
                        <MenuItem value='DMU'>LHSD - DMU</MenuItem>
                        <MenuItem value='NCDC'>LHSD - NCDC</MenuItem>
                        <MenuItem value='FHC'>LHSD - FHC</MenuItem>
                        <MenuItem value='IDC'>LHSD - IDC</MenuItem>
                        <MenuItem value='EOH'>LHSD - EOH</MenuItem>
                        <MenuItem value='RLED'>RLED</MenuItem>
                        <MenuItem value='Personnel'>MSD - Personnel</MenuItem>
                        <MenuItem value='HRDU'>MSD - HRDU</MenuItem>
                        <MenuItem value='Accounting'>MSD - Accounting</MenuItem>
                        <MenuItem value='Budget'>MSD - Budget</MenuItem>
                        <MenuItem value='Cashier'>MSD - Cashier</MenuItem>
                        <MenuItem value='Planning'>MSD - Planning</MenuItem>
                        <MenuItem value='Procurement'>
                            MSD - Procurement
                        </MenuItem>
                        <MenuItem value='Supply'>MSD - Supply</MenuItem>
                        <MenuItem value='Transport/GSS'>
                            MSD - Transport/GSS
                        </MenuItem>
                        <MenuItem value='ICTU'>MSD - ICTU</MenuItem>
                        <MenuItem value='Records'>MSD - Records</MenuItem>
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

// const addEventHandler = (e) => {
//     e.preventDefault();

//     // Fields Test
//     // console.log(e);
//     // for (let i = 0; i < e.target.length; i++) {
//     //     if (e.target[i].name != '')
//     //         console.log(
//     //             `Index: ${i}, Name: ${e.target[i].name}, Value: ${e.target[i].value}`
//     //         );
//     // }

//     const color =
//         divRef.current.value == 'ORD/ARD'
//             ? '#C9190B'
//             : divRef.current.value == 'LHSD'
//             ? '#519DE9'
//             : divRef.current.value == 'RLED'
//             ? '#7CC674'
//             : divRef.current.value == 'MSD'
//             ? '#EF9234'
//             : '#F4C145';

//     const newEvent = {
//         title: titleRef.current.value,
//         start: dayjs(startDateRef.current.value).toDate(),
//         end: dayjs(endDateRef.current.value).toDate(),
//         backgroundColor: color,
//         extendedProps: {
//             _id: uuidv4(),
//             division: divRef.current.value,
//             csu: csuRef.current.value,
//             csuHead: csuHeadRef.current.value,
//         },
//     };
//     eventObj.addEvent(newEvent);

//     clearRefs();
//     handleClick();
// };
