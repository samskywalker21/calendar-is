import React from 'react';
import { useContext } from 'react';
import EventContext from '../context/EventContext';

import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from '@mui/material';

function EventList() {
    const eventObj = useContext(EventContext);

    const { events } = eventObj;

    const list = events.map((row) => {
        return {
            ...row,
            start: new Date(row.start).toLocaleString(),
            end: new Date(row.end).toLocaleString(),
        };
    });

    return (
        <>
            <TableContainer component={Paper}>
                <Table size='medium'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Event Title</TableCell>
                            <TableCell align='center'>Start Date</TableCell>
                            <TableCell align='center'>End Date</TableCell>
                            <TableCell align='center'>Division</TableCell>
                            <TableCell align='center'>
                                Cluster/Section/Unit
                            </TableCell>
                            <TableCell align='center'>
                                Program Manager
                            </TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((row) => (
                            <TableRow
                                key={`${row.title}${row.division}${row.csu}`}
                                // sx={{
                                //     '&:last-child td, &:last-child th': {
                                //         border: 0,
                                //     },
                                // }}
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
                                    {row.division}
                                </TableCell>
                                <TableCell component='th' scope='row'>
                                    {row.csu}
                                </TableCell>
                                <TableCell component='th' scope='row'>
                                    {row.csuHead}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default EventList;
