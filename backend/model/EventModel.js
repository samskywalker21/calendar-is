const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    start: String,
    end: String,
    backgroundColor: String,
    extendedProps: {
        _id: String,
        division: String,
        csu: String,
        csuHead: String,
    },
});

const eventModel = mongoose.model('Event', eventSchema, 'Events');

module.exports = eventModel;
