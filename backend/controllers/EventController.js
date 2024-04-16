const eventModel = require('../model/EventModel');

const getAllEvents = () => {
    return eventModel.find().exec();
};

const addEvent = (event) => {
    const newEvent = new eventModel(event);
    newEvent.save();
};

const testFunc = () => {
    console.log('Wow!');
};

// module.exports = {
//     getAllEvents,
//     addEvent,
//     testFunc,
// };

exports.getAllEvents = getAllEvents;
exports.addEvent = addEvent;
exports.testFunc = testFunc;
