import express from 'express';
import {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent
} from '../controllers/event.controller';
import { verifyToken } from '../middleware/verifyToken';

const router = express.Router();

// Public routes
router.get('/events', getEvents);
router.get('/events/:id', getEvent);

// Protected routes
// router.use(verifyToken);
router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

export default router;