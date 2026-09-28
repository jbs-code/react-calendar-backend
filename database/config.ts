import mongoose from "mongoose";

let connectionPromise: Promise<typeof mongoose> | undefined;

export const dbConnection = async () => {
    if (mongoose.connection.readyState === 1) return;

    if (!connectionPromise) {
        connectionPromise = mongoose
            .connect(process.env.DB_CNN as string)
            .catch((error) => {
                connectionPromise = undefined;
                throw error;
            });
    }

    try {
        await connectionPromise;
        console.log("Connected to DB!");
    } catch (error) {
        console.log(error);
        throw new Error("DB is not working!");
    }
};
