const express = require('express');
const EventController = require('../controllers/EventController');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('You got it baby!');
});

router.post('/', (req, res, next) => {
    res.json({
        message: 'Data Received',
    });
    EventController.addEvent(req.body);
});

module.exports = router;
