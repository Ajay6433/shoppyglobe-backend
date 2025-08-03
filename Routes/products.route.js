import express from 'express';

const router = express.Router();

router.get('/', getProducts);


export { router as productRoutes};