import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Knex } from 'knex';
import { Transporter } from 'nodemailer';
import morgan from 'morgan';
import { ENV } from '@/helpers';

import HealthCheckRoute from '@/routes/health-check';
import UserRoute from '@/routes/user';
import TableRoute from '@/routes/table';
import SendMailRoute from '@/routes/send-mail';

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = +ENV('PORT');

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());
app.use(morgan('combined'));

app.use('/api', [
  HealthCheckRoute,
  UserRoute,
  TableRoute,
  SendMailRoute,
]);

app
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  })
  .on('error', err => {
    console.log('ERROR: ', err);
  });

type KnexFn = (trx: Knex<any>) => any;

declare module 'express' {
  export interface Request {
    hashPassword: (payload: string) => Promise<string>;
    validPassword: (
      payload: string,
      password: string,
    ) => Promise<boolean>;
    mailTransporter: Transporter;
    knexClient: Knex;
    qs: any;
    knex: (
      fn: KnexFn | KnexFn[],
    ) => Promise<[any, Error | null]>;
  }
}
