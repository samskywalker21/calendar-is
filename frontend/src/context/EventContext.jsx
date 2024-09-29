import { createContext } from 'react';
import axios from 'axios';

const EventContext = createContext('');

export default EventContext;

const dburl = `http://${import.meta.env.VITE_BACKEND_ADD}`;

// Get All Events
const getEvents = (setDataFn) => {
	axios
		.get(`${dburl}/event`)
		.then((res) => {
			setDataFn(res.data);
		})
		.catch((res) => {
			console.log(res);
		});
};

const getEventsLimit = async (setDataFn) => {
	const data = await axios
		.get(`${dburl}/event/sorted`)
		.then((res) => {
			setDataFn(res.data);

			return res.data;
		})
		.catch((res) => {
			console.log(res);
		});

	return data;
};

// Add New Event
const addEvent = (event) => {
	axios
		.post(`${dburl}/event`, event)
		.then()
		.catch((res) => {
			console.log(res);
		})
		.finally(() => {
			console.log('Insertion of data executed!');
		});
};

//Delete Event via ID
const deleteEvent = (id) => {
	axios
		.delete(`${dburl}/event/${id}`)
		.then((res) => {
			return res.data;
		})
		.catch((res) => {
			console.log(res);
		})
		.finally(() => {
			console.log('Deletion of data executed!');
		});
};

const getActiveEvents = (setDataFn) => {
	axios
		.get(`${dburl}/event/active`)
		.then((res) => {
			setDataFn(res.data);
		})
		.catch((res) => {
			console.log(res);
		})
		.finally(() => {
			console.log('Fetching of data executed!');
		});
};

const getPendingEvents = (setDataFn) => {
	axios
		.get(`${dburl}/event/pending`)
		.then((res) => {
			setDataFn(res.data);
		})
		.catch((res) => {
			console.log(res);
		})
		.finally(() => {
			console.log('Fetching of data executed!');
		});
};

const updateEvent = (_id, action, setAllEvents) => {
	axios.put(`${dburl}/event/status/${_id}`, { action: action }).then(() => {
		getEventsLimit(setAllEvents);
	});
};

export const eventObj = {
	getEvents,
	addEvent,
	deleteEvent,
	getActiveEvents,
	getPendingEvents,
	getEventsLimit,
	updateEvent,
};
