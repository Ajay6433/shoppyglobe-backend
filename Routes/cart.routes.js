import express from 'express';
import { addToCart, deleteFromCart, updateCartQuantity } from '../Controllers/cart.controller.js';

const router = express.Router();

router.post('/cart', addToCart);
router.put('/cart', updateCartQuantity);
router.delete('/cart/:productId', deleteFromCart);

export { router as cartRoutes };