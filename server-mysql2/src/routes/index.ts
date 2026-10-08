import { Router } from 'express';
import productRoutes from './products.routes';

const router = Router();

router.use('/v1/products', productRoutes);

export default router;