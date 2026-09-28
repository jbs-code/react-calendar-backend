import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN as string);
        console.log("Connected to DB!");
    } catch (error) {
        console.log(error);
        throw new Error("DB is not working!");
    }
};
