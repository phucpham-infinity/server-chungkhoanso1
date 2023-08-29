import { Request, Response } from 'express';
import { BAD_REQUEST, OKE } from '@/helpers';
import { omit } from 'lodash';
import jsonwebtoken from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  const password = req.body.password as string;
  const email = req.body.email as string;
  try {
    const user = await req.knexClient('students').where({ email });
    if (!user[0]) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: 'user not found!' });
    const comparePassword = await req.validPassword(password, user[0].password);
    if (!comparePassword) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: 'password not match!' });
    await req.knexClient('students').where({ id: user[0].id }).update({ login_at: new Date() });

    const token = jsonwebtoken.sign({ name: user[0].name, email: user[0].email, phone: user[0].phone, id: user[0].id }, 'CHUNGKHOANSO1', {
      algorithm: 'HS256',
      expiresIn: '7d',
    });
    return res.status(OKE).json({ statusCode: 200, data: omit(user?.[0], 'password'), token });
  } catch (error) {
    return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: error.message });
  }
};
