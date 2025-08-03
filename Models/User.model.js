import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/ // Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number


    }
})

const User = mongoose.model("user", userSchema);
export default User;