import { Request, Response } from 'express';
import { BAD_REQUEST, OKE } from '@/helpers';

export const forgetPassword = async (req: Request, res: Response) => {
  const email = req.body.email as string;
  const password = req.body.password as string;

  const passwordHash = await req.hashPassword(password);
  // TODO: SEND EMAIL FOR USER

  const [user2, err2] = await req.knex(knex =>
    knex('students').where({ id: email }).update({ password: passwordHash, updated_at: new Date() }),
  );
  if (err2) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: err2?.message });
  return res.status(OKE).json({ statusCode: 200, data: user2 });
};
