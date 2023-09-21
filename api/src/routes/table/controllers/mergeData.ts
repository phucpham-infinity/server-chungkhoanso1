import { Request, Response } from 'express';
import { BAD_REQUEST, OKE } from '@/helpers';
import { isEmpty, isObject, keys } from 'lodash';

export const mergeData = async (
  req: Request,
  res: Response,
) => {
  const table = req.qs?.table as string;
  const conflict = (req.qs?.conflict as string) || 'id';
  const payload = req.body as any;

  if (isEmpty(payload) || !isObject(payload))
    return res.status(BAD_REQUEST).json({
      statusCode: BAD_REQUEST,
      err: 'data invalid!',
    });
  if (!table)
    return res.status(BAD_REQUEST).json({
      statusCode: BAD_REQUEST,
      err: 'table invalid!',
    });

  const [data, err] = await req.knex(knex =>
    knex(table)
      .insert(payload, keys(payload) || ['*'])
      .onConflict(conflict)
      .merge(),
  );
  if (err)
    return res
      .status(BAD_REQUEST)
      .json({ statusCode: BAD_REQUEST, err: err?.message });
  return res
    .status(OKE)
    .json({ statusCode: 200, data: data?.[0] });
};
