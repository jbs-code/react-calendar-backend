import express from "express";
import { dbConnection } from "./database/config.js";
import cors from "cors";
import { authRouter, eventsRouter } from "./routes/index.js";

const app = express();

app.use(cors());
if (!process.env.VERCEL) {
    app.use(express.static("public"));
}
app.use(express.json());

app.use("/api", async (_req, res, next) => {
    try {
        await dbConnection();
        next();
    } catch {
        res.status(503).json({ ok: false, msg: "Database connection failed" });
    }
});

app.use("/api/auth", authRouter);
app.use("/api/events", eventsRouter);

export default app;

if (!process.env.VERCEL) {
    const port = Number(process.env.PORT) || 4000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
