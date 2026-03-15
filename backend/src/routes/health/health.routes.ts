import { Router } from 'express';
import { healthStatus } from './health.controller';

const router = Router();


router.get('/', healthStatus);

export default router;
