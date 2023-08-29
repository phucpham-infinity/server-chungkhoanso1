import { ENV } from '@/helpers';
import { knex as _knex } from 'knex';

export const knex = _knex({
  client: 'mysql',
  debug: true,
  connection: {
    host: ENV('DB_HOST'),
    port: +ENV('DB_PORT'),
    user: ENV('DB_USER'),
    password: ENV('DB_PASSWORD'),
    database: ENV('DB_DATABASE'),
    insecureAuth: true,
  },
});
