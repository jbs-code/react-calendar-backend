import type { Request, Response } from "express";
import { Event } from "../models/index.js";
import { Types } from "mongoose";

export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await Event.find().populate("user", "name");
        res.json({
            ok: true,
            msg: "Events found successfully",
            events,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msn: "Contact to admin please!",
        });
    }
};

export const createEvent = async (req: Request, res: Response) => {
    console.log(req.body);
    const event = new Event(req.body);

    try {
        event.user = new Types.ObjectId((req as Request & { uid: string }).uid);
        const savedEvent = await event.save();

        res.status(201).json({
            ok: true,
            event: savedEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact to admin please!",
        });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    const eventId = req.params.id;
    const userId = (req as Request & { uid: string }).uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: `Event with id ${eventId} was not found`,
            });
        }

        if (event.user.toString() !== userId) {
            return res.status(401).json({
                ok: false,
                msg: "You don't have permission to change this event (Event belongs to someone else)",
            });
        }

        const newEvent = {
            ...req.body,
            user: userId,
        };

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
            new: true,
        });

        res.json({
            ok: true,
            msg: "Event updated successfully",
            event: updatedEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact to admin please!",
        });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    const eventId = req.params.id;
    const userId = (req as Request & { uid: string }).uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: `Event with id ${eventId} was not found`,
            });
        }

        if (event.user.toString() !== userId) {
            return res.status(401).json({
                ok: false,
                msg: "You don't have permission to delete this event (Event belongs to someone else)",
            });
        }

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true,
            msg: "Event deleted successfully",
            event: deletedEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact to admin please!",
        });
    }
};
