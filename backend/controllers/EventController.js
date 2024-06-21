const eventModel = require('../model/EventModel');

const getAllEvents = async (req, res, next) => {
    const allEvents = await eventModel.find({});
    res.json(allEvents);
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

const searchEvent = async (req, res, next) => {
    const titleString = req.params.title;
    const filtEvents = await eventModel
        .find({ title: { $regex: '.*' + titleString + '.*', $options: 'i' } })
        .then((data) => {
            return data;
        });
    res.json(filtEvents);
};

exports.getAllEvents = getAllEvents;
exports.getEvent = getEvent;
exports.addEvent = addEvent;
exports.deleteEvent = deleteEvent;
exports.searchEvent = searchEvent;
