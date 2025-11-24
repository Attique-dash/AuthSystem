import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            console.log("MongoDB already connected");
            return;
        }

        await mongoose.connect(process.env.MONGO_URI as string, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 10s
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection error:", error);
        throw error;
    }
};

export default connectDB;