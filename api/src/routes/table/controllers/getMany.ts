import { Request, Response } from 'express';
import { BAD_REQUEST, OKE } from '@/helpers';
import { isEmpty, keys, omitBy } from 'lodash';

export const getMany = async (req: Request, res: Response) => {
  const limit = +req.qs?.limit || 10;
  const offset = +req.qs?.offset || 0;
  const table = req.qs?.table;
  const where = omitBy(req.qs?.filter, v => !v);
  const search = req.qs?.search;
  const order = req.qs?.sort;

  console.log('where',where);
  

  if (!table) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: 'table invalid!' });
  const [data, err] = await req.knex([
    knex => {
      const TABLE = knex(table);
      if (!isEmpty(search)) {
        for (let index = 0; index < keys(search).length; index++) {
          TABLE.orWhereILike(keys(search)[index], '%' + search[keys(search)[index]] + '%');
        }
      }
      if (!isEmpty(order)) TABLE.orderBy(order);
      if (!isEmpty(where)) {
        for (let index = 0; index < keys(where).length; index++) {
          TABLE.andWhereRaw(`${keys(where)[index]} IN (${where[keys(where)[index]]?.map((x: string) => '"'+x+'"').join(",")})`);
        }
      }
      return TABLE.select('*')
        .limit(limit)
        .offset(offset);
    },
    knex => {
      const TABLE = knex(table);
      if (!isEmpty(search)) {
        for (let index = 0; index < keys(search).length; index++) {
          TABLE.orWhereILike(keys(search)[index], '%' + search[keys(search)[index]] + '%');
        }
      }
      if (!isEmpty(where)) {
        for (let index = 0; index < keys(where).length; index++) {
          TABLE.andWhereRaw(`${keys(where)[index]} IN (${where[keys(where)[index]]?.map((x: string) => '"'+x+'"').join(",")})`);
        }
      }
      return TABLE.count();
    },
  ]);
  if (err) return res.status(BAD_REQUEST).json({ statusCode: BAD_REQUEST, err: err?.message });
  return res
    .status(OKE)
    .json({ statusCode: 200, data: { records: data[0], pagination: { total: data[1]?.[0]?.['count(*)'], limit, offset, table } } });
};
