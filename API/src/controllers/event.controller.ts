import { Request, Response } from 'express';
import {Event} from '../models/event.model';
import { EventRequest, EventUpdateRequest } from '../types/types';

// Create Event
export const createEvent = async (
    req: Request<{}, {}, EventRequest>,
    res: Response
): Promise<void> => {
    try {
        const {
            title,
            description,
            category,
            banner,
            date,
            time,
            duration,
            capacity,
            location,
            organizer
        } = req.body;

        // Validate required fields
        if (!title || !description || !category || !banner || !date || !time || !duration || !capacity) {
            throw new Error('Missing required fields');
        }

        const event = new Event({
            ...req.body,
            status: 'draft',
            createdAt: new Date()
        });

        await event.save();

        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            event
        });
        console.log('Event created successfully');
    } catch (error: any) {
        console.error('Create Event Error:', error.message);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Events
export const getEvents = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            page = 1,
            limit = 10,
            category,
            status,
            startDate,
            endDate
        } = req.query;

        const query: any = {};

        // Apply filters
        if (category) query.category = category;
        if (status) query.status = status;
        if (startDate && endDate) {
            query.date = {
                $gte: new Date(startDate as string),
                $lte: new Date(endDate as string)
            };
        }

        const skip = (Number(page) - 1) * Number(limit);

        const events = await Event.find(query)
            .skip(skip)
            .limit(Number(limit))
            .sort({ date: 1 });

        const total = await Event.countDocuments(query);

        res.status(200).json({
            success: true,
            events,
            pagination: {
                current: Number(page),
                total: Math.ceil(total / Number(limit)),
                totalEvents: total
            }
        });
    } catch (error: any) {
        console.error('Get Events Error:', error.message);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Event
export const getEvent = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            res.status(404).json({
                success: false,
                message: 'Event not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            event
        });
    } catch (error: any) {
        console.error('Get Event Error:', error.message);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update Event
export const updateEvent = async (
    req: Request<{ id: string }, {}, EventUpdateRequest>,
    res: Response
): Promise<void> => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            res.status(404).json({
                success: false,
                message: 'Event not found'
            });
            return;
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                updatedAt: new Date()
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            event: updatedEvent
        });
        console.log('Event updated successfully');
    } catch (error: any) {
        console.error('Update Event Error:', error.message);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Event
export const deleteEvent = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            res.status(404).json({
                success: false,
                message: 'Event not found'
            });
            return;
        }

        await Event.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Event deleted successfully'
        });
        console.log('Event deleted successfully');
    } catch (error: any) {
        console.error('Delete Event Error:', error.message);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};