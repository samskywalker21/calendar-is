import { useContext, useState } from 'react';
import dayjs from 'dayjs';

//Context
import LoginContext from '../../context/LogInContext';

//Components
import ActionModal from './ActionModal';

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
	Chip,
} from '@mui/material';

//Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ReplayIcon from '@mui/icons-material/Replay';
import useEventStore from '../../stores/eventStore';

import { Link } from 'react-router-dom';

const EventList = () => {
	const loginObj = useContext(LoginContext);
	const allEvents = useEventStore((state) => state.listEvents);

	const [modalProps, setModalProps] = useState({
		open: false,
		handleClick: () => {},
		_id: '',
		title: '',
		message: '',
		action: '',
	});

	const handleButtonClick = (id, action) => {
		switch (action) {
			case 'Delete':
				setModalProps({
					open: true,
					_id: id,
					title: 'Delete',
					message: 'Are you sure you want to delete this event?',
					action: 'Delete',
					handleClick: () => {
						closeModal();
					},
				});
				break;
			case 'Approve':
				setModalProps({
					open: true,
					_id: id,
					title: 'Approve',
					message: 'Are you sure you want to approve this event?',
					action: 'Approve',
					handleClick: () => {
						closeModal();
					},
				});
				break;
			case 'Disapprove':
				setModalProps({
					open: true,
					_id: id,
					title: 'Disapprove',
					message: 'Are you sure you want to disapprove this event?',
					action: 'Disapprove',
					handleClick: () => {
						closeModal();
					},
				});
				break;
			case 'Return':
				setModalProps({
					open: true,
					_id: id,
					title: 'Return',
					message:
						'Are you sure you want to return this event to pending?',
					action: 'Return',
					handleClick: () => {
						closeModal();
					},
				});
				break;
		}
	};

	const closeModal = () => {
		setModalProps((prev) => {
			return { ...prev, open: false };
		});
	};

	return (
		<>
			<ActionModal {...modalProps} />
			<TableContainer component={Paper}>
				<Table size='medium'>
					<TableHead>
						<TableRow>
							<TableCell
								align='left'
								sx={{ width: 300, minWidth: 300 }}
							>
								Event Title
							</TableCell>
							<TableCell align='left' sx={{ width: 20 }}>
								Start Date
							</TableCell>
							<TableCell align='left' sx={{ width: 20 }}>
								End Date
							</TableCell>
							<TableCell align='left' sx={{ width: 20 }}>
								Division
							</TableCell>
							<TableCell align='left' sx={{ width: 20 }}>
								Cluster/Section/Unit
							</TableCell>
							<TableCell
								align='left'
								sx={{ width: 200, minWidth: 200 }}
							>
								Program Manager
							</TableCell>
							<TableCell
								align='left'
								sx={{ width: 200, minWidth: 200 }}
							>
								Participants
							</TableCell>
							<TableCell align='left' sx={{ width: 20 }}>
								Status
							</TableCell>
							{loginObj.isLoggedin == true ? (
								<TableCell
									align='left'
									sx={{ width: 50, minWidth: 50 }}
								>
									Action
								</TableCell>
							) : (
								''
							)}
						</TableRow>
					</TableHead>
					<TableBody>
						{allEvents.length === 0 ? (
							<TableRow key='noKey'>
								<TableCell
									colSpan={6}
									sx={{
										whiteSpace: 'normal',
										wordWrap: 'break-word',
									}}
								>
									No data available
								</TableCell>
							</TableRow>
						) : null}
						{allEvents.map((row) => {
							if (row.status === 'I') {
								return;
							}

							const startString = dayjs(row.start).format(
								'MM/DD/YYYY HH:mm A',
							);

							const endString = dayjs(row.end).format(
								'MM/DD/YYYY HH:mm A',
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
									<TableCell
										component='th'
										scope='row'
										sx={{
											whiteSpace: 'normal',
											wordWrap: 'break-word',
										}}
									>
										{row.title}
									</TableCell>
									<TableCell
										component='th'
										scope='row'
										sx={{ maxWidth: 200 }}
									>
										{startString.toString()}
									</TableCell>
									<TableCell
										component='th'
										scope='row'
										sx={{ maxWidth: 200 }}
									>
										{endString.toString()}
									</TableCell>
									<TableCell
										component='th'
										scope='row'
										sx={{ maxWidth: 200 }}
									>
										{row.extendedProps.division}
									</TableCell>
									<TableCell
										component='th'
										scope='row'
										sx={{ maxWidth: 200 }}
									>
										{row.extendedProps.csu}
									</TableCell>
									<TableCell component='th' scope='row'>
										{row.extendedProps.csuHead}
									</TableCell>
									<TableCell component='th' scope='row'>
										{row.extendedProps.participants}
									</TableCell>
									<TableCell component='th' scope='row'>
										{row.status === 'P' ? (
											<Chip
												variant='filled'
												label='Pending'
												color='warning'
											/>
										) : row.status === 'A' ? (
											<Chip
												variant='filled'
												label='Approved'
												color='success'
											/>
										) : row.status === 'D' ? (
											<Chip
												variant='filled'
												label='Disapproved'
												color='error'
											/>
										) : null}
									</TableCell>
									{loginObj.isLoggedin == true ? (
										<TableCell component='th' scope='row'>
											<Stack direction='row' spacing={1}>
												<Button
													variant='contained'
													color='info'
													size='small'
													sx={{ minWidth: 10 }}
													component={Link}
													to={`/edit/${row._id}`}
												>
													<EditIcon />
												</Button>
												<Button
													variant='contained'
													color='error'
													onClick={() =>
														handleButtonClick(
															row._id,
															'Delete',
														)
													}
													size='small'
													sx={{ minWidth: 10 }}
												>
													<DeleteIcon />
												</Button>
												{row.status === 'P' ? (
													<Button
														variant='contained'
														color='success'
														onClick={() =>
															handleButtonClick(
																row._id,
																'Approve',
															)
														}
														size='small'
														sx={{ minWidth: 10 }}
													>
														<ThumbUpIcon />
													</Button>
												) : (
													''
												)}
												{row.status === 'P' ? (
													<Button
														variant='contained'
														color='warning'
														onClick={() =>
															handleButtonClick(
																row._id,
																'Disapprove',
															)
														}
														size='small'
														sx={{ minWidth: 10 }}
													>
														<ThumbDownAltIcon />
													</Button>
												) : (
													''
												)}
												{row.status === 'A' ||
												row.status === 'D' ? (
													<Button
														variant='contained'
														color='primary'
														onClick={() =>
															handleButtonClick(
																row._id,
																'Return',
															)
														}
														size='small'
														sx={{ minWidth: 10 }}
													>
														<ReplayIcon />
													</Button>
												) : (
													''
												)}
											</Stack>
										</TableCell>
									) : (
										''
									)}
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
