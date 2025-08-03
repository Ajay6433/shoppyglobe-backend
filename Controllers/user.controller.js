import User from "../Models/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Controller to register a new user
export async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;

        // Ensures all required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Hashing the password before saving to DB
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Checking if user already exists by email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Creating and store the new user
        const newUser = await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        // If password does not match regex, mongoose throws ValidationError
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: "Validation error: Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
                error: error.message
            });
        }
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
}

// Controller to login a user
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Finding user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Comparing entered password with stored hashed password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generating JWT token valid for 1 hour
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
}
