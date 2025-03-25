import { useState, useEffect } from 'react';

import { Button, Grid, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import axios from 'axios';
import useEventStore from '../../stores/eventStore';

const EventListSearch = () => {
	const setEventList = useEventStore((state) => state.updateListEvents);

	const [searchString, setSearchString] = useState('');
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	let url = `http://${import.meta.env.VITE_BACKEND_ADD}/event/`;

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				if (!searchString) {
					url += 'sorted';
				} else {
					const params = new URLSearchParams();
					params.append('search', searchString);
					if (startDate) {
						params.append(
							'start',
							new Date(startDate).toISOString(),
						);
					}
					if (endDate) {
						params.append('end', new Date(endDate).toISOString());
					}
					url += `search/${searchString}?${params.toString()}`;
					// url += `search/${searchString}`;
				}

				const response = await axios.get(url);
				setEventList(response.data);
			} catch (error) {
				console.error('Error fetching events:', error);
			}
		};

		fetchEvents();
	}, [searchString, startDate, endDate]);

	const handleClear = () => {
		setSearchString('');
		setStartDate(null);
		setEndDate(null);
	};

	return (
		<form>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Grid container spacing={2}>
					<Grid item md={6}>
						<TextField
							variant='outlined'
							type='text'
							label='Search Event Name'
							size='large'
							value={searchString}
							onChange={(e) => setSearchString(e.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid item>
						<DatePicker
							label='From'
							value={startDate}
							onChange={(newValue) => setStartDate(newValue)}
							renderInput={(params) => (
								<TextField {...params} size='small' />
							)}
						/>
					</Grid>
					<Grid item>
						<DatePicker
							label='To'
							value={endDate}
							onChange={(newValue) => setEndDate(newValue)}
							renderInput={(params) => (
								<TextField {...params} size='small' />
							)}
						/>
					</Grid>
					<Grid item>
						<Button size='large' type='reset' onClick={handleClear}>
							Clear
						</Button>
					</Grid>
				</Grid>
			</LocalizationProvider>
		</form>
	);
};

export default EventListSearch;
