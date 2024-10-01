import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EventContext from '../../context/EventContext';

const EditEventPage = () => {
	const [data, setData] = useState([]);
	const { id } = useParams();
	const eventFunction = useContext(EventContext);

	useEffect(() => {
		eventFunction
			.getEventById(id)
			.then((data) => {
				setData(data[0]);
			})
			.catch(() => {
				throw new Error('It does not work');
			});
	}, []);

	return <div>{console.log(data)}</div>;
};

export default EditEventPage;
