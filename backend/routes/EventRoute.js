const express = require('express');
const EventController = require('../controllers/EventController');
const router = express.Router({ mergeParams: true });

router.get('/', EventController.getAllEvents);

router.get('/:id', EventController.getEvent);

router.get('/event/:title', EventController.searchEvent);

router.delete('/:id', EventController.deleteEvent);

router.post('/', EventController.addEvent);

module.exports = router;
