import { Router } from "express";
import {
    createEvent,
    deleteEvent,
    getEvents,
    updateEvent,
} from "../controllers";
import { validarJWT, validateFields } from "../middlewares";
import { check } from "express-validator";
import { isDate } from "../helpers";

export const eventsRouter = Router();

eventsRouter.use(validarJWT);

eventsRouter.get("/", getEvents);
eventsRouter.post(
    "/",
    [
        check("title", "Title is required").not().isEmpty(),
        check("start", "Valid date is required").custom(isDate),
        check("end", "Valid date is required").custom(isDate),
        validateFields,
    ],
    createEvent,
);
eventsRouter.put(
    "/:id",
    [
        check("title", "Title is required").not().isEmpty(),
        check("start", "Valid date is required").custom(isDate),
        check("end", "Valid date is required").custom(isDate),
        validateFields,
    ],
    updateEvent,
);
eventsRouter.delete("/:id", deleteEvent);
