import mongoose from "mongoose";

//This file is responsible for connecting to the MongoDB database using Mongoose.
function dbConnet() {
    try {
        // Connecting to MongoDB using the URI from environment variables
        mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log("MongoDB connected successfully");
            }).catch((error) => {
                console.error("MongoDB connection error:", error);
            });
    }
    catch (error) {
        console.log(error);
    }
}

export default dbConnet;