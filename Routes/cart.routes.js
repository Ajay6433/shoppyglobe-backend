import express from 'express';
import { addToCart, deleteFromCart } from '../Controllers/cart.controller.js';

const router = express.Router();

router.post('/cart', addToCart);
router.delete('/cart/:productId', deleteFromCart);

export { router as cartRoutes };