import { Router } from 'express';
import apiRoutes from './v1/index';

const router = Router();

router.use('/api/v1', apiRoutes);

export default router;
