// Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoute = require('./routes/EventRoute');
const userRoute = require('./routes/UserRoute');

// Variable Declarations
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for the port

// Middleware
app.use(cors());
app.use(express.json()); // Body parser for JSON

// Routes
app.use('/event', eventRoute);
app.use('/auth', userRoute);

// DB Connection and Server Start
const dbURI = 'mongodb://localhost:27017/calendarDB';
mongoose
	.connect(dbURI)
	.then(() => {
		console.log('Connected to MongoDB');
		app.listen(port, () => {
			console.log(`Server started on port ${port}`);
		});
	})
	.catch((error) => {
		console.error('Failed to connect to MongoDB:', error.message);
	});
