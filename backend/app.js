//Imports
const express = require('express');
const mongoose = require('mongoose');
const eventRoute = require('./routes/EventRoute');
const cors = require('cors');

//Var Decs
const app = express();
const port = 3000;

//Middleware
app.use(cors());
app.use(express.json()); //JSON Parsing

//Routes
app.use('/event', eventRoute);

//DB Connection
if (mongoose.connect('mongodb://localhost:27017/calendarDB')) {
    app.listen(port, () => {
        console.log('Server Started!');
    });
} else {
    console.log('No DB Connection');
}

//Server Start
