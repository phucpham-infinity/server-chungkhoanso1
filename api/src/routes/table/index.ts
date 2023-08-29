import { Router } from 'express';
import {knexConnect, query} from '@/middleware';

import { getMany } from './controllers/getMany';
import { getById } from './controllers/getById';
import { mergeDataById } from './controllers/mergeDataById';
import { deleteById } from './controllers/deleteById';


const router = Router().use(knexConnect).use(query);

router.route('/table').get(getMany);
router.route('/table/:id').get(getById);
router.route('/table').post(mergeDataById);
router.route('/table/:id').delete(deleteById);

export default router;

