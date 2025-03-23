const eventModel = require('../model/EventModel');

const getAllEvents = async (req, res, next) => {
	const allEvents = await eventModel.find({});
	res.json(allEvents);
};

const getActiveEvents = async (req, res, next) => {
	const activeEvents = await eventModel.find({ status: 'A' });
	res.json(activeEvents);
};

const getEvent = async (req, res, next) => {
	// res.send(req.params.id);
	const filteredEvent = await eventModel
		.find({ _id: req.params.id })
		.exec()
		.then((data) => {
			return data;
		})
		.catch((err) => {
			return { message: 'Data not found!', err };
		});

	res.json(filteredEvent);
};

const getPendingEvents = async (req, res, next) => {
	// res.send('This works');
	const pendingEvents = await eventModel
		.find({ status: 'P' })
		.exec()
		.then((data) => {
			return data;
		})
		.catch((err) => {
			return { message: 'No Pending Events', err };
		});
	res.json(pendingEvents);
};

const getSortedEvents = async (req, res, next) => {
	const filteredEvent = await eventModel
		.find({})
		.sort({ created_at: -1 })
		.limit(10)
		.exec()
		.then((data) => {
			return data;
		})
		.catch((err) => {
			return { message: 'Data not found!', err };
		});

	res.json(filteredEvent);
};

const deleteEvent = async (req, res, next) => {
	const deletedEvent = await eventModel
		.deleteOne({ _id: req.params.id })
		.then((data) => {
			return data;
		})
		.catch((err) => {
			return { message: 'Data not found!', err };
		});

	res.json(deletedEvent);
};

// const addEvent = (req, res, next) => {
// 	try {
// 		const newEvent = req.body;
// 		const timeStamp = new Date(Date.now());
// 		const addEvent = new eventModel({
// 			...newEvent,
// 			created_at: timeStamp.toISOString(),
// 		});
// 		addEvent.save();
// 		res.json({ message: 'Data has been added!', data: newEvent });
// 	} catch (err) {
// 		res.json(err);
// 	}
// };

const addEvent = async (req, res, next) => {
	try {
		const newEvent = req.body; // Extract event data from request body
		const timeStamp = new Date(Date.now()); // Create a Date object for the current time

		// Create a new event instance
		const event = new eventModel({
			...newEvent,
			withPR: false,
			created_at: timeStamp.toISOString(), // Convert timestamp to ISO format
		});

		// Save the event to the database
		const savedEvent = await event.save();

		// Respond with a success message
		res.status(201).json({
			message: 'Data has been added!',
			data: savedEvent,
		});
	} catch (err) {
		// Handle and respond to errors with appropriate status and message
		res.status(500).json({ error: err.message || 'Internal Server Error' });
	}
};

const searchEvent = async (req, res, next) => {
	console.log(req.query);
	const titleString = req.params.title || '';
	if (titleString != '' && (req.query.start == '' || req.query.end == '')) {
		const escapedTitle = titleString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		const filtEvents = await eventModel
			.find({
				title: { $regex: '.*' + escapedTitle + '.*', $options: 'i' },
			})
			.then((data) => {
				return data;
			});
		res.json(filtEvents);
	}
	if (titleString != '' && (req.query.start != '' || req.query.end != '')) {
		const escapedTitle = titleString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		const filtEvents = await eventModel
			.find({
				title: { $regex: '.*' + escapedTitle + '.*', $options: 'i' },
				start: {
					$gte: req.query.start,
					$lte: req.query.end,
				},
			})
			.then((data) => {
				return data;
			});
		// console.log(filtEvents);
		res.json(filtEvents);
	}
};

const updateEvent = async (req, res, next) => {
	const id = req.params.id;
	const body = req.body.data;

	const event = await eventModel
		.findOneAndUpdate({ _id: id }, { ...body }, { new: true })
		.exec();

	res.json(event);
};

const updateStatus = async (req, res, next) => {
	const id = req.params.id;
	const action = req.body.action;

	if (action === 'Approve') {
		const updatedEvent = await eventModel
			.findOneAndUpdate(
				{ _id: id },
				{ status: 'A', backgroundColor: '#2196f3' },
			)
			.then(() => {
				res.json({ message: 'Event updated' });
			})
			.catch(() => {
				res.json({ message: 'Event not found' });
			});
	}

	if (action === 'Disapprove') {
		const updatedEvent = await eventModel
			.findOneAndUpdate({ _id: id }, { status: 'D' })
			.then(() => {
				res.json({ message: 'Event updated' });
			})
			.catch(() => {
				res.json({ message: 'Event not found' });
			});
	}

	if (action === 'Delete') {
		const updatedEvent = await eventModel
			.findOneAndUpdate({ _id: id }, { status: 'I' })
			.then(() => {
				res.json({ message: 'Event updated' });
			})
			.catch(() => {
				res.json({ message: 'Event not found' });
			});
	}

	if (action === 'Return') {
		const updatedEvent = await eventModel
			.findOneAndUpdate(
				{ _id: id },
				{ status: 'P', backgroundColor: '#F57C00' },
			)
			.then(() => {
				res.json({ message: 'Event updated' });
			})
			.catch(() => {
				res.json({ message: 'Event not found' });
			});
	}

	if (action === 'withPR') {
		const updatedEvent = await eventModel
			.findOneAndUpdate(
				{ _id: id },
				{ backgroundColor: '#27632A', withPR: true },
			)
			.then(() => {
				res.json({ message: 'Event updated' });
			})
			.catch(() => {
				res.json({ message: 'Event not found' });
			});
	}
};

const endEvents = async (req, res, next) => {
	const date = new Date(Date.now()).toISOString();
	const events = await eventModel
		.find({
			$and: [
				{ end: { $lt: date } },
				{ $or: [{ status: 'A' }, { status: 'P' }] },
			],
		})
		.exec();

	res.send(events);
};

//Migrations

//Adding Event Types
const addEventsType = async (req, res, next) => {
	try {
		// Await the result of the updateMany operation
		const result = await eventModel.updateMany({}, { $set: { type: 'E' } });

		// Respond with success message and optionally include the number of updated documents
		res.json({
			message: `Events have been updated. ${result.nModified} document(s) were modified.`,
		});
	} catch (e) {
		// Send error response in case of failure
		res.status(500).json({
			error: 'An error occurred while updating events.',
			details: e,
		});
	}
};

//Updating Event Colors
const updateEventColors = async (req, res, next) => {
	try {
		// Perform both updates concurrently using Promise.all for better performance
		const [green, orange] = await Promise.all([
			eventModel.updateMany(
				{ status: 'A' },
				{ $set: { backgroundColor: '#27632A' } },
			),
			eventModel.updateMany(
				{ status: 'P' },
				{ $set: { backgroundColor: '#F57C00' } },
			),
		]);

		// Send response with information about the modified documents
		res.json({
			message: 'Event colors updated successfully',
			greenModified: green.nModified || green.modifiedCount, // Mongoose versions might return different property names
			orangeModified: orange.nModified || orange.modifiedCount,
		});
	} catch (e) {
		// Log the error for debugging
		console.error('Error updating event colors:', e);

		// Send error response
		res.status(500).json({
			error: 'An error occurred while updating events.',
			details: e.message || e,
		});
	}
};

//Add With PR Column (default False for Pending, default True for Approved)
const addWithPR = async (req, res, next) => {
	try {
		// Update events with status 'A' and type 'E'
		const allApproved = await eventModel.updateMany(
			{ status: 'A', type: 'E' },
			{ $set: { withPR: true } },
		);

		// Update events with status 'A' and type 'M'
		const allApproved2 = await eventModel.updateMany(
			{ status: 'A', type: 'M' },
			{ $set: { withPR: false } },
		);

		// Update events with status 'P'
		const allApproved3 = await eventModel.updateMany(
			{ status: 'P' },
			{ $set: { withPR: false } },
		);

		// Optionally, log the results
		console.log(allApproved, allApproved2, allApproved3);
	} catch (error) {
		console.error('Error updating events:', error);
	}
};

exports.getAllEvents = getAllEvents;
exports.getEvent = getEvent;
exports.addEvent = addEvent;
exports.deleteEvent = deleteEvent;
exports.searchEvent = searchEvent;
exports.getSortedEvents = getSortedEvents;
exports.getPendingEvents = getPendingEvents;
exports.updateStatus = updateStatus;
exports.getActiveEvents = getActiveEvents;
exports.updateEvent = updateEvent;
exports.endEvents = endEvents;
exports.addEventsType = addEventsType;
exports.updateEventColors = updateEventColors;
exports.addWithPR = addWithPR;
