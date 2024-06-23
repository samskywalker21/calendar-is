import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import dayjs from 'dayjs';

//Context
import EventContext from '../../context/EventContext';

//Components
import DeleteModal from './DeleteModal';
import EventFormModal from './EventFormModal';

//Material UI Imports
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Button,
    Stack,
} from '@mui/material';

//Axios
import axios from 'axios';

const EventList = ({ eventList }) => {
    const eventObj = useContext(EventContext);
    const [deleteModalOpen, deleteHandleClick] = useState(false);
    const [editModalOpen, editHandleClick] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [editObject, setEditObject] = useState('');

    const events = eventList;

    const openDeleteModal = (e) => {
        setSelectedId(e.target.value);
        deleteHandleClick(!deleteModalOpen);
    };

    const openEditModal = (e) => {
        setEditObject(JSON.parse(e.target.value));
    };

    const closeModal = () => {
        if (deleteModalOpen == true || editModalOpen == true) {
            deleteHandleClick(false);
            editHandleClick(false);
        } else {
            return;
        }
    };

    useEffect(() => {
        console.log(editObject);
        // editHandleClick(!editModalOpen);
    }, [editObject]);

    return (
        <>
            <DeleteModal
                open={deleteModalOpen}
                handleClick={closeModal}
                _id={selectedId}
                title={'Delete Event?'}
                message={'Are you sure you want to delete this event?'}
            />
            <EventFormModal
                open={editModalOpen}
                handleClick={closeModal}
                isEdit={true}
                data={editObject}
            />
            <TableContainer component={Paper}>
                <Table size='medium'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Event Title</TableCell>
                            <TableCell align='left'>Start Date</TableCell>
                            <TableCell align='left'>End Date</TableCell>
                            <TableCell align='left'>Division</TableCell>
                            <TableCell align='left'>
                                Cluster/Section/Unit
                            </TableCell>
                            <TableCell align='left'>Program Manager</TableCell>
                            <TableCell align='left'>Participants</TableCell>
                            <TableCell align='left'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((row) => {
                            if (row.title == undefined || row.title == null) {
                                return (
                                    <TableRow key='noKey'>
                                        <TableCell colSpan={6}>
                                            No data available
                                        </TableCell>
                                    </TableRow>
                                );
                            }

                            const startString = dayjs(row.start).format(
                                'MM/DD/YYYY HH:mm A'
                            );

                            const endString = dayjs(row.end).format(
                                'MM/DD/YYYY HH:mm A'
                            );

                            return (
                                <TableRow
                                    key={row._id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component='th' scope='row'>
                                        {row.title}
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        {startString.toString()}
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        {endString.toString()}
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        {row.extendedProps.division}
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        {row.extendedProps.csu}
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        {row.extendedProps.csuHead}
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        {row.extendedProps.participants}
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        <Stack direction='row' spacing={2}>
                                            {/* <Button
                                                variant='contained'
                                                color='success'
                                                value={JSON.stringify(row)}
                                                onClick={openEditModal}
                                            >
                                                Edit
                                            </Button> */}
                                            <Button
                                                variant='contained'
                                                color='error'
                                                value={row._id}
                                                onClick={openDeleteModal}
                                            >
                                                Delete
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default EventList;
