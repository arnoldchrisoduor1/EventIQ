import { Request, Response } from 'express';
import { Ticket } from '../models/ticket.model';
import { Event } from '../models/event.model';
import QRCode from 'qrcode';
import crypto from 'crypto';
import { TicketRequest, TransferRequest } from '../types/types';


// Generate unique ticket number
const generateTicketNumber = () => {
    return `TIX-${crypto.randomBytes(8).toString('hex').toUpperCase()}`;
};

// Generate encrypted QR data
const generateQRData = (ticketId: string, eventId: string, userId: string) => {
    const data = `${ticketId}-${eventId}-${userId}-${Date.now()}`;
    return crypto.createHash('sha256').update(data).digest('hex');
};

// Purchase Ticket
export const purchaseTicket = async (
    req: Request<{}, {}, TicketRequest>,
    res: Response
): Promise<void> => {
    try {
        const { eventId, ticketType, seatAssignment } = req.body;
        const userId = req.user.id; // Assuming user ID is set by auth middleware

        // Check if event exists and has available capacity
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        // Check event capacity
        const soldTickets = await Ticket.countDocuments({ event: eventId });
        if (soldTickets >= event.capacity) {
            throw new Error('Event is sold out');
        }

        // Create ticket
        const ticket = new Ticket({
            event: eventId,
            owner: userId,
            originalPurchaser: userId,
            ticketType,
            ticketNumber: generateTicketNumber(),
            seatAssignment,
            price: event.ticketTiers.find(tier => tier.name === ticketType)?.price
        });

        // Generate QR code data
        const qrData = generateQRData(ticket._id.toString(), eventId, userId);
        ticket.qrCode = {
            data: qrData,
            generatedAt: new Date()
        };

        await ticket.save();

        res.status(201).json({
            success: true,
            message: 'Ticket purchased successfully',
            ticket
        });
    } catch (error: any) {
        console.error('Purchase Ticket Error:', error.message);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Transfer Ticket
export const transferTicket = async (
    req: Request<{ id: string }, {}, TransferRequest>,
    res: Response
): Promise<void> => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        const { toUserId, transferReason } = req.body;
        const fromUserId = req.user.id;

        if (!ticket) {
            throw new Error('Ticket not found');
        }

        if (ticket.owner.toString() !== fromUserId) {
            throw new Error('Not authorized to transfer this ticket');
        }

        if (!ticket.canBeTransferred()) {
            throw new Error('Ticket cannot be transferred');
        }

        // Update ticket
        ticket.owner = toUserId;
        ticket.status = 'transferred';
        ticket.transferCount += 1;
        ticket.transferHistory.push({
            fromUser: fromUserId,
            toUser: toUserId,
            transferReason
        });

        // Generate new QR code
        const qrData = generateQRData(ticket._id.toString(), ticket.event.toString(), toUserId);
        ticket.qrCode = {
            data: qrData,
            generatedAt: new Date()
        };

        await ticket.save();

        res.status(200).json({
            success: true,
            message: 'Ticket transferred successfully',
            ticket
        });
    } catch (error: any) {
        console.error('Transfer Ticket Error:', error.message);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Verify Ticket Entry
export const verifyTicketEntry = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        
        if (!ticket) {
            throw new Error('Ticket not found');
        }

        if (!ticket.validateForEntry()) {
            throw new Error('Ticket is not valid for entry');
        }

        // Update entry status
        ticket.entryStatus = {
            hasEntered: true,
            entryTime: new Date(),
            entryLocation: req.body.location || 'Main Entrance'
        };
        ticket.status = 'used';

        await ticket.save();

        res.status(200).json({
            success: true,
            message: 'Entry verified successfully',
            entryDetails: ticket.entryStatus
        });
    } catch (error: any) {
        console.error('Verify Entry Error:', error.message);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get QR Code
export const getTicketQR = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        
        if (!ticket) {
            throw new Error('Ticket not found');
        }

        if (ticket.owner.toString() !== req.user.id) {
            throw new Error('Not authorized to access this ticket');
        }

        const qrCodeImage = await QRCode.toDataURL(ticket.qrCode.data);

        res.status(200).json({
            success: true,
            qrCode: qrCodeImage
        });
    } catch (error: any) {
        console.error('Get QR Code Error:', error.message);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get User's Tickets
export const getUserTickets = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user.id;
        const tickets = await Ticket.find({ owner: userId })
            .populate('event')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            tickets
        });
    } catch (error: any) {
        console.error('Get User Tickets Error:', error.message);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};