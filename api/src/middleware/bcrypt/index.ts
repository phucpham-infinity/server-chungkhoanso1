import { NextFunction, Request } from 'express';
import bcrypt from 'bcryptjs';

export async function hashPassword(request: Request, _, next: NextFunction) {
  const salt = await bcrypt.genSalt(10);

  request.hashPassword = (payload: string) => bcrypt.hash(payload, salt);
  request.validPassword = (payload: string, password: string) => bcrypt.compare(payload, password);

  next();
}
