import { Request, Response } from 'express';
import { BAD_REQUEST, OKE } from '@/helpers';
import jsonwebtoken from 'jsonwebtoken';
import { omit } from 'lodash';

export const me = async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'] as string;
  const token = authHeader && authHeader.split(' ')[1];

  

  if (token == null) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: 'Token null!' });
  jsonwebtoken.verify(token, 'CHUNGKHOANSO1', async (err: any, user: any) => {
    if (err) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: 'Token invalid!' });
    const [user2, err2] = await req.knex(knex => knex('students').where({ id: user.id }));
    if (err2 || !user2[0]) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: err2?.message || 'User not found!' });
    return res.status(OKE).json({ statusCode: 200, data: omit(user2[0], 'password') });
  });
};
