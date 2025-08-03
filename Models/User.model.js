import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is mandatory
    },
    email: {
        type: String,
        required: true, // Email is mandatory
        unique: true,   // Ensures no duplicate email in the DB
    },
    password: {
        type: String,
        required: true, 
        // Password must be at least 8 characters long and contain:
        // one uppercase letter, one lowercase letter, and one number
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    }
});

const User = mongoose.model("user", userSchema);
export default User;
