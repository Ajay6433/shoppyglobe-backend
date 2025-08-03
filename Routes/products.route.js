import express from 'express';
import { getProducts, getProductById } from '../Controllers/product.controller.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/product/:id', getProductById);


export { router as productRoutes};