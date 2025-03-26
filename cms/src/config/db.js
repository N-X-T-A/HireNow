import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
        if (!process.env.DB_URI) {
            throw new Error("DB_URI is undefined. Check your .env file!");
        }

        await mongoose.connect('mongodb://localhost:27017/titanIntership', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Mongodb is connected');

    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
};
