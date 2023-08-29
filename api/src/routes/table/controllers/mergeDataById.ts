import { Request, Response } from 'express';
import { BAD_REQUEST, OKE } from '@/helpers';
import { isEmpty, isObject, keys } from 'lodash';

export const mergeDataById = async (req: Request, res: Response) => {
  const table = req.qs?.table as string;
  const payload = req.body as any;

  if (isEmpty(payload) || !isObject(payload)) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: 'data invalid!' });
  if (!table) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: 'table invalid!' });

  const [data, err] = await req.knex(knex =>
    knex(table)
      .insert(payload, keys(payload) || ['*'])
      .onConflict('id')
      .merge(),
  );
  if (err) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: err?.message });
  return res.status(OKE).json({ statusCode: 200, data: data?.[0] });
};
