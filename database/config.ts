import mongoose from "mongoose";

let connectionPromise: Promise<typeof mongoose> | null = null;

export const dbConnection = async () => {
    const connectionString = process.env.DB_CNN;
    if (!connectionString) {
        throw new Error("The DB_CNN environment variable is not configured.");
    }

    if (mongoose.connection.readyState === 1) {
        return mongoose;
    }

    try {
        connectionPromise ??= mongoose.connect(connectionString);
        await connectionPromise;
        return mongoose;
    } catch (error) {
        connectionPromise = null;
        throw new Error("DB is not working!", { cause: error });
    }
};
