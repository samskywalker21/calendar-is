import { useState, useRef, useEffect } from 'react';

import { Button, Grid, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import axios from 'axios';
import useEventStore from '../../stores/eventStore';

const EventListSearch = () => {
	const setEventList = useEventStore((state) => state.updateListEvents);
	const searchRef = useRef('');
	const startRef = useRef('');
	const endRef = useRef('');

	const [startDate, setStart] = useState('');
	const [endDate, setEnd] = useState('');
	const [searchString, setString] = useState('');

	const handleChange = () => {
		setString(searchRef.current.value);
	};

	const handleStartChange = () => {
		setStart(startRef.current.value);
	};

	const handleEndChange = () => {
		setEnd(endRef.current.value);
	};

	useEffect(() => {
		searchString.length == 0
			? axios({
					method: 'GET',
					url: `http://${
						import.meta.env.VITE_BACKEND_ADD
					}/event/sorted`,
				}).then((res) => {
					setEventList(res.data);
				})
			: axios({
					method: 'GET',
					url: `http://${
						import.meta.env.VITE_BACKEND_ADD
					}/event/event/${searchString}?start=${startRef.current.value != '' ? new Date(startRef.current.value).toISOString() : ''}&end=${endRef.current.value != '' ? new Date(endRef.current.value).toISOString() : ''}`,
				}).then((res) => {
					setEventList(res.data);
				});
	}, [searchString, startDate, endDate]);

	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Grid container spacing={2}>
					<Grid item md='6'>
						<TextField
							variant='outlined'
							type='text'
							label='Search Event Name'
							size='large'
							onChange={handleChange}
							inputRef={searchRef}
							defaultValue={searchString}
							fullWidth
						/>
					</Grid>
					<Grid item>
						<DatePicker
							label='From'
							size='small'
							inputRef={startRef}
							onChange={handleStartChange}
						/>
					</Grid>
					<Grid item>
						<DatePicker
							label='To'
							size='small'
							inputRef={endRef}
							onChange={handleEndChange}
						/>
					</Grid>
					<Grid item>
						<Button
							size='large'
							onClick={() => {
								startRef.current.value = '';
								endRef.current.value = '';
								setStart('');
								setEnd('');
							}}
						>
							Clear
						</Button>
					</Grid>
				</Grid>
			</LocalizationProvider>
		</>
	);
};

export default EventListSearch;
