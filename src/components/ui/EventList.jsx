import React from 'react';
import { useContext, useState } from 'react';

//Context
import EventContext from '../context/EventContext';

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

function EventList() {
    const eventObj = useContext(EventContext);
    const [deleteModalOpen, deleteHandleClick] = useState(false);
    const [editModalOpen, editHandleClick] = useState(false);
    const [selectedId, setSelectedId] = useState('');

    const events = eventObj.getEvents();

    const list = events.map((row) => {
        return {
            ...row,
            start: new Date(row.start).toLocaleString(),
            end: new Date(row.end).toLocaleString(),
        };
    });

    const openDeleteModal = (e) => {
        e.preventDefault();
        setSelectedId(e.target.value);
        deleteHandleClick(!deleteModalOpen);
    };

    const openEditModal = (e) => {
        e.preventDefault();
        setSelectedId(e.target.value);
        editHandleClick(!editModalOpen);
    };

    return (
        <>
            <DeleteModal
                open={deleteModalOpen}
                handleClick={openDeleteModal}
                _id={selectedId}
                title={'Delete Event?'}
                message={'Are you sure you want to delete this event?'}
            />
            <EventFormModal
                open={editModalOpen}
                handleClick={openEditModal}
                isEdit={true}
                _id={selectedId}
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
                            <TableCell align='left'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((row) => {
                            if (row == undefined) return;
                            if (row != undefined) {
                                return (
                                    <TableRow
                                        key={row.extendedProps._id}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell component='th' scope='row'>
                                            {row.title}
                                        </TableCell>
                                        <TableCell component='th' scope='row'>
                                            {row.start}
                                        </TableCell>
                                        <TableCell component='th' scope='row'>
                                            {row.end}
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
                                            <Stack direction='row' spacing={2}>
                                                <Button
                                                    variant='contained'
                                                    color='success'
                                                    value={
                                                        row.extendedProps._id
                                                    }
                                                    onClick={openEditModal}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant='contained'
                                                    color='error'
                                                    value={
                                                        row.extendedProps._id
                                                    }
                                                    onClick={openDeleteModal}
                                                >
                                                    Delete
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default EventList;
