import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection error");
        console.log(error);
    }
};
export default connectDB;