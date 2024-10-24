import React from 'react';

import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	Typography,
	Box,
	Grid,
	Stack,
	Button,
} from '@mui/material';

import dayjs from 'dayjs';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const ViewModal = ({ isOpen, changeModal, viewEvent }) => {
	const startDate = viewEvent.end ? dayjs(viewEvent.start.toString()) : '';
	const endDate = viewEvent.end ? dayjs(viewEvent.end.toString()) : '';

	return (
		<>
			<Dialog
				open={isOpen}
				TransitionComponent={Transition}
				keepMounted
				onClose={changeModal}
			>
				{viewEvent.type === 'E' ? (
					<DialogTitle>Event Details</DialogTitle>
				) : (
					<DialogTitle>Monitoring Details</DialogTitle>
				)}
				<DialogContent>
					<DialogContentText>
						<Box width={500}>
							<Grid container spacing={2}>
								<Grid item lg={6} md={12} sm={12} xs={12}>
									<Stack spacing={2}>
										<Stack>
											<Typography
												variant='body1'
												color={'black'}
											>
												Title
											</Typography>
											<Typography
												variant='body1'
												color={'black'}
											>
												{viewEvent.title}
											</Typography>
										</Stack>
										<Stack>
											<Typography
												variant='body1'
												color={'black'}
											>
												Start Date
											</Typography>
											<Typography
												variant='body1'
												color={'black'}
											>
												{dayjs(startDate).format(
													'MM/DD/YYYY HH:mm A',
												)}
											</Typography>
										</Stack>
										<Stack>
											<Typography
												variant='body1'
												color={'black'}
											>
												End Date
											</Typography>
											<Typography
												variant='body1'
												color={'black'}
											>
												{dayjs(endDate).format(
													'MM/DD/YYYY HH:mm A',
												)}
											</Typography>
										</Stack>
									</Stack>
								</Grid>
								<Grid item lg={6} md={12} sm={12} xs={12}>
									<Stack spacing={2}>
										<Stack>
											<Typography
												variant='body1'
												color={'black'}
											>
												Division
											</Typography>
											<Typography
												variant='body1'
												color={'black'}
											>
												{viewEvent.division}
											</Typography>
										</Stack>
										<Stack>
											<Typography
												variant='body1'
												color={'black'}
											>
												Cluster/Section/Unit
											</Typography>
											<Typography
												variant='body1'
												color={'black'}
											>
												{viewEvent.csu}
											</Typography>
										</Stack>
										<Stack>
											<Typography
												variant='body1'
												color={'black'}
											>
												Cluster/Section/Unit Head
											</Typography>
											<Typography
												variant='body1'
												color={'black'}
											>
												{viewEvent.csuHead}
											</Typography>
										</Stack>
									</Stack>
								</Grid>
								<Grid
									item
									lg={12}
									md={12}
									sm={12}
									xs={12}
									mt={1}
								>
									<Stack>
										{viewEvent.type === 'E' ? (
											<Typography
												variant='body1'
												color={'black'}
											>
												Participants
											</Typography>
										) : (
											<Typography
												variant='body1'
												color={'black'}
											>
												To Monitor:
											</Typography>
										)}

										<Typography
											variant='body1'
											color={'black'}
										>
											{viewEvent.participants}
										</Typography>
									</Stack>
								</Grid>
							</Grid>
						</Box>
					</DialogContentText>
					<DialogActions>
						<Button onClick={changeModal}>Close</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ViewModal;
