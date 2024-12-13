const userModel = require('../model/EventModel');

const getUser = async (req, res, next) => {
	res.send('It works!');
};

exports.getUser = getUser;
