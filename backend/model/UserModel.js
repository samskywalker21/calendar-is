const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	id: String,
	name: String,
	userId: String,
	accountType: String,
	status: String,
});

const userModel = mongoose.model('User', userSchema, 'Users');

module.exports = userModel;
