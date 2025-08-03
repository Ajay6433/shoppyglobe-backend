import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRoutes } from './Routes/user.routes.js';
import { productRoutes } from './Routes/products.route.js';
import { cartRoutes } from './Routes/cart.routes.js';
import dbConnet from './Config/db.config.js';
import { authUser } from './Middlewares/auth.middleware.js';

const app = express();

// Loads environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connecting to MongoDB
dbConnet();

// Public routes for user registration and login
app.use('/', userRoutes);
app.use('/', productRoutes);

// Protected routes ensures only authenticated users can access product and cart routes
app.use('/', authUser, cartRoutes);

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
