import { Router } from 'express';
import { knexConnect, query } from '@/middleware';
import { checkInfo } from './controllers/check';

const router = Router();

router
  .route('/health-check')
  .get([knexConnect, query, checkInfo]);

export default router;
