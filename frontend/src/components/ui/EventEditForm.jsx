import React, { useState, useContext, useEffect } from 'react';
import {
	FormControl,
	InputLabel,
	OutlinedInput,
	Stack,
	Select,
	MenuItem,
	Button,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import EventContext from '../../context/EventContext';
import { Link, useNavigate } from 'react-router-dom';
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
	<MenuItem value='PDOHO BUKIDNON' key='PDOHO BUKIDNON'>
	LHSD - PDOHO BUKIDNON
</MenuItem>,
<MenuItem value='PDOHO CAMIGUIN' key='PDOHO CAMIGUIN'>
LHSD - PDOHO CAMIGUIN
</MenuItem>,
<MenuItem value='PDOHO LANAO DEL NORTE' key='PDOHO LANAO DEL NORTE'>
	LHSD - PDOHO LANAO DEL NORTE
</MenuItem>,
<MenuItem value='PDOHO MISAMIS OCCIDENTAL' key='PDOHO MISAMIS OCCIDENTAL'>
LHSD - PDOHO MISAMIS OCCIDENTAL
</MenuItem>,
<MenuItem value='PDOHO MISAMIS ORIENTAL' key='PDOHO MISAMIS ORIENTAL'>
	LHSD - PDOHO MISAMIS ORIENTAL
</MenuItem>,
<MenuItem value='CDOHO CAGAYAN DE ORO' key='CDOHO CAGAYAN DE ORO'>
LHSD - CDOHO CAGAYAN DE ORO
</MenuItem>,
<MenuItem value='CDOHO ILIGAN' key='CDOHO ILIGAN'>
	LHSD - CDOHO ILIGAN
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

const EventEditForm = ({ id }) => {
	const { control, handleSubmit, setValue } = useForm();
	const [selectedDiv, updateSelectedDiv] = useState('ORD/ARD');
	const eventFunction = useContext(EventContext);
	const nav = useNavigate();
	const openNotif = useNotifStore((state) => state.openNotif);

	useEffect(() => {
		eventFunction
			.getEventById(id)
			.then((data) => {
				const event = data[0];
				console.log(event);
				setValue('title', event.title);
				setValue('start', dayjs(event.start));
				setValue('end', dayjs(event.end));
				setValue('type', event.type);
				setValue('division', event.extendedProps['division']);
				setValue('csu', event.extendedProps['csu']);
				setValue('csuHead', event.extendedProps['csuHead']);
				setValue('participants', event.extendedProps['participants']);
				updateSelectedDiv(event.extendedProps['division']);
			})
			.catch(() => {
				throw new Error('It does not work');
			});
	}, []);

	const onSubmit = (formData) => {
		const newEvent = {
			title: formData.title,
			start: dayjs(formData.start).toISOString(),
			end: dayjs(formData.end).toISOString(),
			type: formData.type,
			extendedProps: {
				division: formData.division,
				csu: formData.csu,
				csuHead: formData.csuHead,
				participants: formData.participants,
			},
		};

		console.log(formData);
		eventFunction.updateEventDetails(id, newEvent);
		openNotif('Event has been updated!', 'success');
		nav('/events');
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 25 }}>
				<Stack spacing={2}>
					<FormControl>
						<InputLabel>Event Title</InputLabel>
						<Controller
							name='title'
							control={control}
							defaultValue=''
							render={({ field }) => (
								<OutlinedInput
									{...field}
									label='Event Title'
									sx={{ width: 500 }}
									size='small'
									autoFocus
									required
								/>
							)}
						/>
					</FormControl>

					<FormControl>
						<InputLabel id='type'>Type</InputLabel>
						<Controller
							name='type'
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									value={field.value || 'E'}
									labelId='type'
									label='Type'
									sx={{ width: 500 }}
									required
								>
									<MenuItem value='E'>Event</MenuItem>
									<MenuItem value='M'>Monitoring</MenuItem>
								</Select>
							)}
						/>
					</FormControl>

					<Controller
						name='start'
						control={control}
						render={({ field }) => (
							<DateTimePicker
								{...field}
								label='Start Date'
								sx={{ width: 500 }}
							/>
						)}
					/>

					<Controller
						name='end'
						control={control}
						render={({ field }) => (
							<DateTimePicker
								{...field}
								label='End Date'
								sx={{ width: 500 }}
							/>
						)}
					/>

					<FormControl>
						<InputLabel id='division'>Division</InputLabel>
						<Controller
							name='division'
							control={control}
							defaultValue={selectedDiv}
							render={({ field }) => (
								<Select
									{...field}
									labelId='division'
									label='Division'
									value={selectedDiv}
									onChange={(e) => {
										field.onChange(e);
										updateSelectedDiv(e.target.value);
									}}
									sx={{ width: 500 }}
									required
								>
									<MenuItem value='ORD/ARD'>ORD/ARD</MenuItem>
									<MenuItem value='LHSD'>LHSD</MenuItem>
									<MenuItem value='RLED'>RLED</MenuItem>
									<MenuItem value='MSD'>MSD</MenuItem>
								</Select>
							)}
						/>
					</FormControl>

					<FormControl>
						<InputLabel id='csu'>Cluster/Section/Unit</InputLabel>
						<Controller
							name='csu'
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									labelId='csu'
									label='Cluster/Section/Unit'
									value={field.value || 'RESDRU'}
									sx={{ width: 500 }}
									required
								>
									{selectedDiv === 'ORD/ARD'
										? ordArray.map((item) => item)
										: null}
									{selectedDiv === 'LHSD'
										? lhsdArray.map((item) => item)
										: null}
									{selectedDiv === 'RLED' ? (
										<MenuItem value='RLED'>RLED</MenuItem>
									) : null}
									{selectedDiv === 'MSD'
										? msdArray.map((item) => item)
										: null}
								</Select>
							)}
						/>
					</FormControl>

					<FormControl>
						<InputLabel>Program Manager/C/S/U Head</InputLabel>
						<Controller
							name='csuHead'
							control={control}
							defaultValue=''
							render={({ field }) => (
								<OutlinedInput
									{...field}
									label='Program Manager/C/S/U Head'
									sx={{ width: 500 }}
									size='small'
									required
								/>
							)}
						/>
					</FormControl>

					<FormControl>
						<InputLabel>Participants</InputLabel>
						<Controller
							name='participants'
							control={control}
							defaultValue=''
							render={({ field }) => (
								<OutlinedInput
									{...field}
									label='Participants'
									sx={{ width: 500 }}
									size='small'
									multiline
									required
								/>
							)}
						/>
					</FormControl>

					<Button
						sx={{ width: 500 }}
						type='submit'
						variant='contained'
						color='primary'
					>
						Edit
					</Button>
					<Link to={'/events'}>
						<Button
							sx={{ width: 500 }}
							variant='contained'
							color='warning'
						>
							Return
						</Button>
					</Link>
				</Stack>
			</form>
		</LocalizationProvider>
	);
};

export default EventEditForm;
