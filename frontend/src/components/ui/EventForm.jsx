import { useState, useContext } from 'react';

// Context
import EventContext from '../../context/EventContext';
import useEventStore from '../../stores/eventStore';

// UUID
import { v4 as uuidv4 } from 'uuid';

// Material UI
import { Stack, TextField, MenuItem, Button } from '@mui/material';

// Material UI DateTime Picker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import useNotifStore from '../../stores/notifStore';

const divisionOptions = {
	ORD: [
		'RESDRU',
		'Legal/PACD',
		'CHEPU',
		'HFDU',
		'Infra',
		'CMU',
		'Research',
		'ICTU',
	],
	LHSD: [
		'LHSDC',
		'DMU',
		'NCDC',
		'FHC',
		'IDC',
		'EOH',
		'PDOHO BUKIDNON',
		'PDOHO CAMIGUIN',
		'PDOHO LANAO DEL NORTE',
		'PDOHO MISAMIS OCCIDENTAL',
		'PDOHO MISAMIS ORIENTAL',
		'CDOHO CAGAYAN DE ORO',
		'CDOHO ILIGAN',
	],
	MSD: [
		'Personnel',
		'HRDU',
		'Accounting',
		'Budget',
		'Cashier',
		'Planning',
		'Procurement',
		'Supply',
		'Transport/GSS',
		'Records',
	],
	RLED: ['RLED'],
};

const EventForm = ({ handleClick }) => {
	const [dateError, setDateError] = useState(false);
	const eventObj = useContext(EventContext);
	const setEventsList = useEventStore((state) => state.updateListEvents);
	const openNotif = useNotifStore((state) => state.openNotif);

	// Form state
	const [formData, setFormData] = useState({
		title: '',
		start: null,
		end: null,
		division: 'ORD',
		csu: '',
		csuHead: '',
		participants: '',
		type: 'E',
	});

	const isFormValid = () => {
		return (
			formData.title &&
			formData.start &&
			formData.end &&
			!dateError &&
			formData.division &&
			formData.csu &&
			formData.csuHead &&
			formData.participants
		);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleDateChange = (name, value) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleClear = () => {
		setFormData({
			title: '',
			start: null,
			end: null,
			division: 'ORD',
			csu: '',
			csuHead: '',
			participants: '',
			type: 'E',
		});
	};

	const addEventHandler = (e) => {
		e.preventDefault();

		if (!isFormValid()) {
			openNotif('Please fill all required fields.', 'error');
			return;
		}

		const newEvent = {
			_id: uuidv4(),
			title: formData.title,
			start: dayjs(formData.start).toISOString(),
			end: dayjs(formData.end).toISOString(),
			backgroundColor: '#F57C00',
			status: 'P',
			type: formData.type,
			extendedProps: {
				division: formData.division,
				csu: formData.csu,
				csuHead: formData.csuHead,
				participants: formData.participants,
			},
		};

		eventObj.addEvent(newEvent, setEventsList);
		openNotif('Event has been added', 'success');
		handleClear();
		handleClick();
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Stack
				direction='column'
				spacing={2}
				component='form'
				onSubmit={addEventHandler}
			>
				<TextField
					id='titleId'
					name='title'
					label='Event/Training Title'
					required
					value={formData.title}
					onChange={handleInputChange}
				/>
				<TextField
					id='typeId'
					name='type'
					label='Type'
					select
					required
					value={formData.type}
					onChange={handleInputChange}
				>
					<MenuItem value='E'>Event</MenuItem>
					<MenuItem value='M'>Monitoring</MenuItem>
				</TextField>
				<DateTimePicker
					label='Start Date'
					value={formData.start}
					onChange={(value) => handleDateChange('start', value)}
					renderInput={(params) => <TextField {...params} required />}
				/>
				<DateTimePicker
					label='End Date'
					value={formData.end}
					onChange={(value) => {
						// Ensure both dates are valid before comparison
						console.log('Start Date:', formData.start);
						console.log('End Date:', value);
						if (formData.start && value) {
							const isInvalidDate = dayjs(value).isBefore(
								dayjs(formData.start),
							);
							setDateError(isInvalidDate); // Update error state
						}
						handleDateChange('end', value); // Always update the state
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							required
							error={dateError}
							helperText={
								dateError
									? 'End Date must not be earlier than Start Date'
									: ''
							}
						/>
					)}
				/>
				<TextField
					id='divisionId'
					name='division'
					label='Division'
					select
					required
					value={formData.division}
					onChange={handleInputChange}
				>
					{Object.keys(divisionOptions).map((div) => (
						<MenuItem key={div} value={div}>
							{div}
						</MenuItem>
					))}
				</TextField>
				<TextField
					id='csuId'
					name='csu'
					label='Cluster/Section/Unit'
					select
					required
					value={formData.csu}
					onChange={handleInputChange}
				>
					{divisionOptions[formData.division]?.map((unit) => (
						<MenuItem key={unit} value={unit}>
							{unit}
						</MenuItem>
					))}
				</TextField>
				<TextField
					id='csuHeadId'
					name='csuHead'
					label='Program Manager/C/S/U Head'
					required
					value={formData.csuHead}
					onChange={handleInputChange}
				/>
				<TextField
					id='participants'
					name='participants'
					label='Participants/Facilities'
					required
					multiline
					value={formData.participants}
					onChange={handleInputChange}
				/>
				<Stack spacing={1}>
					<Button type='submit' variant='contained' fullWidth>
						Add Event
					</Button>
					<Button
						type='button'
						variant='contained'
						color='warning'
						fullWidth
						onClick={handleClear}
					>
						Clear
					</Button>
				</Stack>
			</Stack>
		</LocalizationProvider>
	);
};

export default EventForm;
