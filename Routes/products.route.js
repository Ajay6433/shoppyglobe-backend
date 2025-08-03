import express from 'express';
import { getProducts, getProductById } from '../Controllers/product.controller.js';

const router = express.Router();

// Fetch all products
router.get('/products', getProducts);

// Fetch a single product by its ID (from the URL)
router.get('/product/:id', getProductById);

// Export the router to use in the main app
export { router as productRoutes };