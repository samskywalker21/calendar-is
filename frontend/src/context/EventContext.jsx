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
			if (setDataFn) {
				setDataFn(res.data);
			}
		})
		.catch((res) => {
			console.log(res);
		});

	return data;
};

const getEventById = async (id) => {
	try {
		const { data } = await axios.get(`${dburl}/event/${id}`);
		return data;
	} catch (error) {
		console.error('Error fetching event:', error);
		throw error; // Optionally re-throw the error for further handling
	}
};

// Add New Event
const addEvent = (event, fn1) => {
	axios
		.post(`${dburl}/event`, event)
		.then((data) => {
			getEventsLimit(fn1);
		})
		.catch((res) => {
			console.log(res);
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
		});
};

const updateEventStatus = (
	_id,
	action,
	setCalendarEvents,
	setAllEvents,
	handleClick,
) => {
	axios.put(`${dburl}/event/status/${_id}`, { action: action }).then(() => {
		getActiveEvents(setCalendarEvents);
		getEventsLimit(setAllEvents);
		handleClick();
	});
};

const updateEventDetails = async (id, body) => {
	await axios.put(`${dburl}/event/${id}`, { data: body });
};

export const eventObj = {
	getEventById,
	getEvents,
	addEvent,
	deleteEvent,
	getActiveEvents,
	getPendingEvents,
	getEventsLimit,
	updateEventStatus,
	updateEventDetails,
};
