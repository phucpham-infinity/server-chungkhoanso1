import { Request, Response } from 'express';
import { BAD_REQUEST, OKE } from '@/helpers';
import jsonwebtoken from 'jsonwebtoken';

export const adminToken = async (
  req: Request,
  res: Response,
) => {
  const password = req.body.password as string;
  if (password !== 'CHUNGKHOANSO1') {
    return res.status(BAD_REQUEST).json({
      statusCode: BAD_REQUEST,
      err: 'password not match!',
    });
  }
  const token = jsonwebtoken.sign(
    {
      name: 'admin',
      email: 'email',
      phone: 'phone',
      id: 'admin',
    },
    'CHUNGKHOANSO1',
    {
      algorithm: 'HS256',
      expiresIn: '7000d',
    },
  );
  return res.status(OKE).json({
    statusCode: 200,
    token,
  });
};
