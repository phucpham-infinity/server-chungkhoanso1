import { BAD_REQUEST, OKE } from '@/helpers';
import { Request, Response } from 'express';

export const checkInfo = async (
  req: Request,
  res: Response,
) => {
  const [data, err] = await req.knex([
    knex => knex.raw('SELECT 1'),
  ]);
  if (err)
    return res
      .status(BAD_REQUEST)
      .json({ statusCode: BAD_REQUEST, err: err?.message });

  return res.status(OKE).json({
    statusCode: 200,
    test: { version: 3 },
    data,
  });
};
