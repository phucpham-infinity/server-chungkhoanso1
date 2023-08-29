import { Request, Response } from 'express';
import { BAD_REQUEST, OKE } from '@/helpers';
import { omit } from 'lodash';

export const changePassword = async (req: Request, res: Response) => {

  const email = req.body.email as string;
  const password = req.body.password as string;
  const newPassword = req.body.newPassword as string;

  try {

    const user = await req.knexClient('students').where({ email });
    if (!user[0]) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: 'user not found!' });
    const comparePassword = await req.validPassword(password, user[0].password);
    if (!comparePassword) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: 'password not match!' });

    const newPasswordHash = await req.hashPassword(newPassword);
    await req.knexClient('students').where({ id: user[0].id }).update({ password: newPasswordHash , updated_at: new Date()});

    return res.status(OKE).json({ statusCode: 200, data: omit(user?.[0], 'password') });
  } catch (error) {
    return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: error.message });
  }
};
