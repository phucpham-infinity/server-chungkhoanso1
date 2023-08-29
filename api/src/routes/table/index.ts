import { Router } from 'express';
import { knexConnect, query } from '@/middleware';

import { getMany } from './controllers/getMany';
import { getById } from './controllers/getById';
import { mergeDataById } from './controllers/mergeDataById';
import { deleteById } from './controllers/deleteById';

const router = Router();

router.route('/table').get([knexConnect, query, getMany]);
router
  .route('/table/:id')
  .get([knexConnect, query, getById]);
router
  .route('/table')
  .post([knexConnect, query, mergeDataById]);
router
  .route('/table/:id')
  .delete([knexConnect, query, deleteById]);

export default router;
