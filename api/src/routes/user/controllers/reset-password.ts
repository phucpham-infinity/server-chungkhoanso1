import { Request, Response } from 'express';
import { BAD_REQUEST, OKE } from '@/helpers';
import generatorPassword from 'generate-password';

export const resetPassword = async (req: Request, res: Response) => {
  const userId = req.params.userId as string;
  const password = generatorPassword.generate({
    length: 10,
    numbers: true,
  });
  const passwordHash = await req.hashPassword(password);
  // TODO: SEND EMAIL FOR USER

  const [user2, err2] = await req.knex(knex =>
    knex('students').where({ id: userId }).update({ password: passwordHash,  updated_at: new Date() }),
  );
  if (err2) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: err2?.message });
  return res.status(OKE).json({ statusCode: 200, data: user2 });
};
