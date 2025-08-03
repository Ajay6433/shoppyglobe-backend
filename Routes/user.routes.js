import express from 'express';
import { createUser, loginUser } from '../Controllers/user.controller.js';

const router = express.Router();

// Route to register a new user
router.post('/register', createUser);

// Route to log in an existing user
router.post('/login', loginUser);

// Export router to be used in main app
export { router as userRoutes };