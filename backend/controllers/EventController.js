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
        .sort({ start: 1 })
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
    if (titleString != '') {
        const filtEvents = await eventModel
            .find({
                title: { $regex: '.*' + titleString + '.*', $options: 'i' },
            })
            .then((data) => {
                return data;
            });
        res.json(filtEvents);
    }
};

const updateStatus = async (req, res, next) => {
    const id = req.params.id;
    const action = req.body.action;

    if (action === 'Approve') {
        const updatedEvent = await eventModel
            .findOneAndUpdate({ _id: id }, { status: 'A' })
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
            .findOneAndUpdate({ _id: id }, { status: 'P' })
            .then(() => {
                res.json({ message: 'Event updated' });
            })
            .catch(() => {
                res.json({ message: 'Event not found' });
            });
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
