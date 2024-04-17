const eventModel = require('../model/EventModel');

const getAllEvents = async (req, res, next) => {
    const allEvents = await eventModel.find({});
    res.json(allEvents);
};

const getEvent = async (req, res, next) => {
    const filteredEvent = await eventModel
        .find({
            extendedProps: {
                _id: req.params.id,
            },
        })
        .exec()
        .then((data) => {
            res.json(data);
        })
        .catch(() => {
            res.json({ message: 'Data found!' });
        });
};

const deleteEvent = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    try {
        res.json(
            await eventModel.deleteOne({
                extendedProp: {
                    _id: id,
                },
            })
        );
    } catch (e) {
        console.log(e);
    }
};

const addEvent = (req, res, next) => {
    try {
        const newEvent = req.body;
        const addEvent = new eventModel(newEvent);
        addEvent.save();
        res.json({ message: 'Data has been added!', data: newEvent });
    } catch (err) {
        res.json(err);
    }
};

// module.exports = {
//     getAllEvents,
//     addEvent,
//     testFunc,
// };

exports.getAllEvents = getAllEvents;
exports.getEvent = getEvent;
exports.addEvent = addEvent;
exports.deleteEvent = deleteEvent;
