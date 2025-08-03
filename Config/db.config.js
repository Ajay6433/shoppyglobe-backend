import mongoose from "mongoose";

function dbConnet() {
    try {
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