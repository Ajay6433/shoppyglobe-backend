import express from 'express';
import { addToCart, deleteFromCart, updateCartQuantity } from '../Controllers/cart.controller.js';

const router = express.Router();

// Add a product to the user's cart
router.post('/cart', addToCart);

// Update quantity of a specific product in the cart
router.put('/cart', updateCartQuantity);

// Remove a specific product from the cart using productId from URL
router.delete('/cart/:productId', deleteFromCart);

// Export the cart routes to be used in the main app
export { router as cartRoutes };