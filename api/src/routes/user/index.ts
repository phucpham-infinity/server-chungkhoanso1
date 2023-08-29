import { Router } from 'express';
import { approveUser, login, me, resetPassword, changePassword, forgetPassword } from './controllers';
import { knexConnect, query, hashPassword, mailTransporterConnect } from '@/middleware';

const router = Router().use(knexConnect).use(query).use(hashPassword).use(mailTransporterConnect);;

router.route('/users/login').post(login);
router.route('/users/me').get(me);
router.route('/users/approve/:userId').post(approveUser);

router.route('/users/reset-password/:userId').get(resetPassword);
router.route('/users/change-password').post(changePassword);
router.route('/users/forget-password').post(forgetPassword);

export default router;
