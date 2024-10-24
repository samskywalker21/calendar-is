const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
	_id: String,
	title: String,
	start: String,
	end: String,
	backgroundColor: String,
	status: String,
	type: 'String',
	extendedProps: {
		division: String,
		csu: String,
		csuHead: String,
		participants: String,
	},
});

const eventModel = mongoose.model('Event', eventSchema, 'Events');

module.exports = eventModel;
