import { Router } from 'express';
import {
  approveUser,
  login,
  me,
  resetPassword,
  changePassword,
  forgetPassword,
  requestPassword,
  adminToken,
  publicToken,
} from './controllers';
import {
  knexConnect,
  query,
  hashPassword,
  mailTransporterConnect,
} from '@/middleware';

const router = Router();

router
  .route('/users/login')
  .post([knexConnect, query, hashPassword, login]);
router
  .route('/users/admin-token')
  .post([knexConnect, query, adminToken, login]);

router
  .route('/users/public-token')
  .post([knexConnect, query, publicToken, login]);
router
  .route('/users/me')
  .get([knexConnect, query, hashPassword, me]);
router
  .route('/users/approve/:userId')
  .post([
    knexConnect,
    query,
    hashPassword,
    mailTransporterConnect,
    approveUser,
  ]);

router
  .route('/users/reset-password/:userId')
  .get([
    knexConnect,
    query,
    hashPassword,
    mailTransporterConnect,
    resetPassword,
  ]);
router
  .route('/users/change-password')
  .post([
    knexConnect,
    query,
    hashPassword,
    mailTransporterConnect,
    changePassword,
  ]);
router
  .route('/users/forget-password')
  .post([
    knexConnect,
    query,
    hashPassword,
    mailTransporterConnect,
    forgetPassword,
  ]);

router
  .route('/users/request-password')
  .post([
    knexConnect,
    query,
    hashPassword,
    mailTransporterConnect,
    requestPassword,
  ]);

export default router;
