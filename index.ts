import express from "express";
import { dbConnection } from "./database/config";
import cors from "cors";
import { authRouter, eventsRouter } from "./routes";

//Create server
const app = express();
const port = process.env.PORT;

//Initializing DB
dbConnection();

//middlewares
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/events", eventsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
