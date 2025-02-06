import express from 'express';
import {
    purchaseTicket,
    transferTicket,
    verifyTicketEntry,
    getTicketQR,
    getUserTickets
} from '../controllers/ticket.controller';
import { verifyToken } from '../middleware/verifyToken';
import { authenticateUser, isEventOrganizer } from '../middleware/authMiddleware';

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// User routes
router.post('/tickets/purchase', purchaseTicket);
router.post('/tickets/:id/transfer', transferTicket);
router.get('/tickets/my-tickets', getUserTickets);
router.get('/tickets/:id/qr', getTicketQR);

// Event organizer routes
router.post('/tickets/:id/verify-entry', isEventOrganizer, verifyTicketEntry);

export default router;