import express from "express";
import { dbConnection } from "./database/config";
import cors from "cors";
import { authRouter, eventsRouter } from "./routes";

//Create server
const app = express();
const port = Number(process.env.PORT) || 3000;

//middlewares
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/api", async (_req, _res, next) => {
    try {
        await dbConnection();
        next();
    } catch (error) {
        next(error);
    }
});

//routes
app.use("/api/auth", authRouter);
app.use("/api/events", eventsRouter);

if (process.env.VERCEL !== "1") {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

export default app;
