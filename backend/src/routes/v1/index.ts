import { Router } from 'express';
import nasaRoutes from './nasa/nasa.routes';

const router = Router();

router.use('/nasa', nasaRoutes);

export default router;
