import { Request, Response } from 'express';
import { BAD_REQUEST, OKE } from '@/helpers';

export const register = async (
  req: Request,
  res: Response,
) => {
  const email = req.body.email as string;
  const phone = req.body.phone as string;
  const status = req.body.status as string;
  const name = req.body.name as string;

  try {
    const emailFound = await req.knexClient
      .from('users')
      .where({
        email,
      })
      .first();

    const phoneFound = await req.knexClient
      .from('users')
      .where({
        phone,
      })
      .first();

    if (!!emailFound || !!phoneFound) {
      return res.status(BAD_REQUEST).json({
        statusCode: BAD_REQUEST,
        err: 'Info found!',
      });
    } else {
      const [user2, err2] = await req.knex(knex =>
        knex('users').insert({
          status,
          email,
          phone,
          name,
          updated_at: new Date(),
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
    }
  } catch (error) {
    if (error)
      return res.status(BAD_REQUEST).json({
        statusCode: BAD_REQUEST,
        err: error?.message,
      });
  }
};
