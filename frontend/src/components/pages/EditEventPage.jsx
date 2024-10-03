import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import EventEditForm from '../ui/EventEditForm';

const EditEventPage = () => {
	const { id } = useParams();

	return (
		<>
			<Container>
				<Typography variant='h4'>Edit Event</Typography>
				<EventEditForm id={id} />
			</Container>
		</>
	);
};

export default EditEventPage;
