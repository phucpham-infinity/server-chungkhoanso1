import { Router } from 'express';
import { knexConnect, query } from '@/middleware';

import { checkInfo } from './controllers/check';

const router = Router().use(knexConnect).use(query);

router.route('/health-check').get(checkInfo);

export default router;
