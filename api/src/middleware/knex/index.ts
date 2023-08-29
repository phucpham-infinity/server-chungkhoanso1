import { NextFunction, Request } from "express";
import { Knex, knex } from "knex";
import { isArray } from "lodash";
import { ENV } from "@/helpers";

type KnexFn = (trx: Knex<any>) => any;

export async function knexConnect(request: Request, _, next: NextFunction) {
  const knexClient: Knex = knex({
    client: "mysql",
    debug: true,
    useNullAsDefault: true,
    connection: {
      host: ENV("DB_HOST"),
      port: +ENV("DB_POST"),
      user: ENV("DB_USER"),
      password: ENV("DB_PASSWORD"),
      database: ENV("DB_DATABASE"),
    },
    pool: {
      min: 2,
      max: 10,
    },
  });
  request.knexClient = knexClient;
  request.knex = async (
    fn: KnexFn | KnexFn[]
  ): Promise<[any, Error | null]> => {
    try {
      let payload: any = null;
      if (!isArray(fn)) {
        payload = await fn(knexClient).finally(async () => {
          await knexClient.destroy();
        });
      } else {
        const process: any[] = [];
        for (let index = 0; index < fn.length; index++) {
          process.push(fn?.[index]?.(knexClient));
        }
        payload = await Promise.all(process).finally(async () => {
          await knexClient.destroy();
        });
      }
      return [payload, null];
    } catch (error) {
      return [null, error];
    }
  };
  next()
}
