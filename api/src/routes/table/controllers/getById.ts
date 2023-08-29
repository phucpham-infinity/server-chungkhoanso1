import { Request, Response } from 'express';
import { BAD_REQUEST, NOT_FOUND, OKE } from '@/helpers';

export const getById = async (req: Request, res: Response) => {
  const table = req.qs?.table as string;
  const id = req.params.id as string;

  if (!id) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: 'id invalid!' });
  if (!table) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: 'table invalid!' });

  const [data, err] = await req.knex(knex => knex(table).select('*').where({ id }));
  if (err) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: err?.message });
  if (!data.length) return res.status(NOT_FOUND).json({ statusCode: BAD_REQUEST, err: 'data not found!' });
  return res.status(OKE).json({ statusCode: 200, data: data?.[0] });
};
