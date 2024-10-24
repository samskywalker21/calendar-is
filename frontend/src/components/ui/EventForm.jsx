import { useState, useRef } from 'react';
import { useContext } from 'react';

// Context
import EventContext from '../../context/EventContext';
import useEventStore from '../../stores/eventStore';

//UUID
import { v4 as uuidv4 } from 'uuid';

// Material UI
import { Stack, TextField, MenuItem, Button } from '@mui/material';

// Material UI DateTime Picker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import useNotifStore from '../../stores/notifStore';

const ordArray = [
	<MenuItem value='RESDRU' key={'RESDRU'}>
		ORD - RESDRU
	</MenuItem>,
	<MenuItem value='Legal/PACD' key={'Legal/PACD'}>
		ORD - Legal/PACD
	</MenuItem>,
	<MenuItem value='CHEPU' key={'CHEPU'}>
		ORD - CHEPU
	</MenuItem>,
	<MenuItem value='HFDU' key={'HFDU'}>
		ORD - HFDU
	</MenuItem>,
	<MenuItem value='Infra' key={'Infra'}>
		ORD - Infra
	</MenuItem>,
	<MenuItem value='CMU' key={'CMU'}>
		ORD - CMU
	</MenuItem>,
	<MenuItem value='Research' key={'Research'}>
		ORD - Research
	</MenuItem>,
];

const lhsdArray = [
	<MenuItem value='LHSDC' key='LHSDC'>
		LHSD - LHSDC
	</MenuItem>,
	<MenuItem value='DMU' key='DMU'>
		LHSD - DMU
	</MenuItem>,
	<MenuItem value='NCDC' key='NCDC'>
		LHSD - NCDC
	</MenuItem>,
	<MenuItem value='FHC' key='FHC'>
		LHSD - FHC
	</MenuItem>,
	<MenuItem value='IDC' key='IDC'>
		LHSD - IDC
	</MenuItem>,
	<MenuItem value='EOH' key='EOH'>
		LHSD - EOH
	</MenuItem>,
];

const msdArray = [
	<MenuItem value='Personnel' key='Personnel'>
		MSD - Personnel
	</MenuItem>,
	<MenuItem value='HRDU' key='HRDU'>
		MSD - HRDU
	</MenuItem>,
	<MenuItem value='Accounting' key='Accounting'>
		MSD - Accounting
	</MenuItem>,
	<MenuItem value='Budget' key='Budget'>
		MSD - Budget
	</MenuItem>,
	<MenuItem value='Cashier' key='Cashier'>
		MSD - Cashier
	</MenuItem>,
	<MenuItem value='Planning' key='Planning'>
		MSD - Planning
	</MenuItem>,
	<MenuItem value='Procurement' key='Procurement'>
		MSD - Procurement
	</MenuItem>,
	<MenuItem value='Supply' key='Supply'>
		MSD - Supply
	</MenuItem>,
	<MenuItem value='Transport/GSS' key='Transport/GSS'>
		MSD - Transport/GSS
	</MenuItem>,
	<MenuItem value='ICTU' key='ICTU'>
		MSD - ICTU
	</MenuItem>,
	<MenuItem value='Records' key='Records'>
		MSD - Records
	</MenuItem>,
];

const EventForm = ({ handleClick }) => {
	const [selectedDiv, updateSelectedDiv] = useState('ORD/ARD');
	const eventObj = useContext(EventContext);
	const setEventsList = useEventStore((state) => state.updateListEvents);
	const openNotif = useNotifStore((state) => state.openNotif);

	//Field Refs
	const titleRef = useRef('');
	const startDateRef = useRef('');
	const endDateRef = useRef('');
	const divRef = useRef('');
	const csuRef = useRef('');
	const csuHeadRef = useRef('');
	const partiRef = useRef('');
	const typeRef = useRef('');

	const clearRefs = () => {
		titleRef.current.value = null;
		startDateRef.current.value = null;
		endDateRef.current.value = null;
		divRef.current.value = null;
		csuHeadRef.current.value = null;
		partiRef.current.value = null;
		updateSelectedDiv('ORD/ARD');
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

		const newEvent = {
			_id: uuidv4(),
			title: titleRef.current.value,
			start: dayjs(startDateRef.current.value).toISOString(),
			end: dayjs(endDateRef.current.value).toISOString(),
			backgroundColor: '#F57C00',
			status: 'P',
			type: typeRef.current.value,
			extendedProps: {
				division: divRef.current.value,
				csu: csuRef.current.value,
				csuHead: csuHeadRef.current.value,
				participants: partiRef.current.value,
			},
		};
		eventObj.addEvent(newEvent, setEventsList);
		openNotif('Event has been added', 'success');
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
						required
						defaultValue=''
						inputRef={titleRef}
					/>
					<TextField
						id='typeId'
						name='type'
						label='Type'
						defaultValue='E'
						inputRef={typeRef}
						select
						required
					>
						<MenuItem value='E'>Event</MenuItem>
						<MenuItem value='M'>Monitoring</MenuItem>
					</TextField>
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
						defaultValue={selectedDiv}
						inputRef={divRef}
						select
						required
						onChange={(e) => {
							updateSelectedDiv(e.target.value);
						}}
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
						{selectedDiv === 'ORD/ARD'
							? ordArray.map((row) => row)
							: null}
						{selectedDiv === 'LHSD'
							? lhsdArray.map((row) => row)
							: null}
						{selectedDiv === 'RLED' ? (
							<MenuItem value='RLED'>RLED</MenuItem>
						) : null}
						{selectedDiv === 'MSD'
							? msdArray.map((row) => row)
							: null}
					</TextField>
					<TextField
						id='csuHeadId'
						name='csuHead'
						label='Program Manager/C/S/U Head'
						defaultValue=''
						inputRef={csuHeadRef}
						required
					/>
					<TextField
						id='participants'
						name='participants'
						label='Participants/Facilities'
						defaultValue=''
						inputRef={partiRef}
						multiline
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

export default EventForm;
