const express = require('express');
const EventController = require('../controllers/EventController');
const router = express.Router();

router.get('/', EventController.getAllEvents);

router.get('/event/:title', EventController.searchEvent);

router.get('/pending', EventController.getPendingEvents);

router.get('/:id', EventController.getEvent);

router.get('/sorted', EventController.getSortedEvents);

router.delete('/:id', EventController.deleteEvent);

router.post('/', EventController.addEvent);

router.patch('/:id');

module.exports = router;
