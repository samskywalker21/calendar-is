const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    app.json();
    next();
});

app.get('/', (req, res, next) => {
    res.send('It works!');
});

app.listen(port, () => {
    console.log('Server Started!');
});
