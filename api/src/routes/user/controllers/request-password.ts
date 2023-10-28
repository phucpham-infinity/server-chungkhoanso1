import { Request, Response } from 'express';
import { BAD_REQUEST, OKE } from '@/helpers';

export const requestPassword = async (
  req: Request,
  res: Response,
) => {
  const email = req.body.email as string;
  const [user2, err2] = await req.knex(knex =>
    knex('users').where({ email: email }).update({
      status: 'PENDING_PASSWORD',
    }),
  );
  if (err2)
    return res.status(BAD_REQUEST).json({
      statusCode: BAD_REQUEST,
      err: err2?.message,
    });

  return res
    .status(OKE)
    .json({ statusCode: 200, data: user2 });
};
