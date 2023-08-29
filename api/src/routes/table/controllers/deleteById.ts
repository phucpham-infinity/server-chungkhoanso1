import { Request, Response } from 'express';
import { BAD_REQUEST, OKE } from '@/helpers';

export const deleteById = async (req: Request, res: Response) => {
  const table = req.qs?.table as string;
  const id = req.params.id as string;

  if (!id) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: 'id invalid!' });
  if (!table) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: 'table invalid!' });

  const [data, err] = await req.knex(knex => knex(table).where({ id }).del());
  if (err) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: err?.message });
  return res.status(OKE).json({ statusCode: 200, data: data });
};
