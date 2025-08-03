import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRoutes } from './Routes/user.routes.js';
import { productRoutes } from './Routes/products.route.js';
import dbConnet from './Config/db.config.js';
import { authUser } from './Middlewares/auth.middleware.js';
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
dbConnet();



app.use('/', userRoutes);
app.use('/',authUser, productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})




// ajaykhan6433
// zPRAgKbQqBnr1irv

// mongodb+srv://ajaykhan6433:zPRAgKbQqBnr1irv@cluster0.t3s5vf7.mongodb.net/